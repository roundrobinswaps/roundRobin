const db = require("../models");

//Decides which match function to run
const matchFunction = (params, res) => {
	switch(params.matchOptions){
		case "Per Shipping Preferences Only":
			matchShipping(params.eventId, res);
			break;
		case "Totally Random":
			matchRandom(params.eventId, res);
			break;
		default:
			matchShipping(params.eventId, res);
	}
};

//Matches users based on their shipping preferences
const matchShipping = (eventId, res) => {
	db.eventAssociations.findAll({
		where: {
			eventId: eventId
		}, 
		include: [{
      model: db.user,
      attributes: ['id', 'shippingPreferenceId'],
      include: [{
      	model: db.stateProvince,
      	attributes: ['id', 'countryId']
      }]
		}]
	}).then(associations => {
/* usersByPref is a sorted array by preference, and for Not Worldwide, a nested array sorted by Countries.
Indices start at 1 to correspond to database Ids for ease.
Indices for Preference are hard coded to:
	1 = By Country
	2 = Worldwide
*/
		let usersByPref = [[],[],[]];
		associations.forEach(association => {
			let userId = association.dataValues.userId;
			let preference = association.dataValues.user.dataValues.shippingPreferenceId;
			let country = association.dataValues.user.dataValues.stateProvince.dataValues.countryId;
			if(preference != 2){
//Initialize Array for Country
				if(!usersByPref[preference][country]){
					usersByPref[preference][country] = [];
				}
				usersByPref[preference][country].push(userId);
			}else{
				usersByPref[preference].push(userId);
			}
		});
// Match users whose shipping preference is their own country
		for(let count = 1; count < usersByPref[1].length; count++) {
			console.log("Country: " + count);
			if(usersByPref[1][count]) {
				if(usersByPref[1][count].length > 1){
	// Loops thru to get the matches for everyone except the last user			
					for(let i = 0; i < usersByPref[1][count].length -1; i++){
						let user = usersByPref[1][count][i];
						let matchUser = usersByPref[1][count][i+1];
						updateMatchIds(eventId, user, matchUser);
					}
	// Matches the last user in the queue to the first user in the queue
					updateMatchIds(eventId, usersByPref[1][count][usersByPref[1][count].length-1], usersByPref[1][count][0]);
				}else if (usersByPref[1][count].length === 1){
	// If there's only 1 user in the country, put them in the Worldwide matchqueue				
					usersByPref[2].push(usersByPref[1][count][0]);
				}
			}
		}
// Match users whose shipping preference is Worldwide - for loop gets everyone but the last user
		console.log("worldwide");
		for(let i = 0; i < usersByPref[2].length-1; i++){
			let user = usersByPref[2][i];
			let matchUser = usersByPref[2][i+1];
			updateMatchIds(eventId, user, matchUser);
		}
// Match final user to first user
		updateMatchIds(eventId, usersByPref[2][usersByPref[2].length-1], usersByPref[2][0]);
// Update Event Status to Event In Progress
		db.status.findOne({
			where: {
				statusName: "Event In Progress"
			}
		}).then(status => {
			db.event.update({
				statusId: status.dataValues.id
			}, {
				where: {
					id: eventId
				}
			}).then(data => {
				res.json(data);  		  				
			}).catch(error => res.json(error));  			
		}).catch(err => res.json(err))
	}).catch(er => res.json(er));
};

const updateMatchIds = (eventId, user, matchUser) => {
	db.eventAssociations.update({
		matchedUserId: matchUser
	}, {
		where: {
			userId: user,
			eventId: eventId
		}
	}).catch(err => res.json(err));
};

//Matches users completely round-robin with no regard to shipping preferences
const matchRandom = (eventId, res) => {
	db.eventAssociations.findAll({
		where: {
			eventId: eventId
		}
	}).then(associations => {
// Matches all but the last user
		for(let i = 0; i < associations.length-1; i++) {
			let userId = associations[i].dataValues.userId;
			let matchId = associations[i+1].dataValues.userId;
			updateMatchIds(eventId, userId, matchId);
		}		
// Matches last user to the first user
		updateMatchIds(eventId, associations[associations.length-1].dataValues.userId, associations[0].dataValues.userId);
// Update Event Status to Event In Progress
		db.status.findOne({
			where: {
				statusName: "Event In Progress"
			}
		}).then(status => {
			db.event.update({
				statusId: status.dataValues.id
			}, {
				where: {
					id: eventId
				}
			}).then(data => {
				res.json(data);  		  				
			}).catch(error => res.json(error));
		}).catch(er => res.json(er));  		
	}).catch(err => res.json(err));	
};

// Defining methods for the eventController
module.exports = {
/*
	Req = {
		eventName
		userId
		organizerAKA = can be NULL
		categoryId (from categories table - pre-sets)
		matchOptionId (from matchOptions table - pre-sets)
		aboutEvent = can be NULL
		signupDeadline = can be NULL
		shipDealine = can be NULL
		isPrivate
	}
	1 - Set statusId to the ID for "Signup" when event is created (should be pre-populated in status table)
	2 - Create new Event
	3 - Create eventAssociation for moderator (IE - they are automatically a participant in their own exchange)
	4 - Res.json while eventAssociation is happening
*/	
  create: function(req, res) {
    db.status.findOne({
    	where: {
    		statusName: "Signup"
    	}
    }).then(status => {
    	var request = req.body;
    	request.statusId = status.id;
      request.categoryId = parseInt(request.categoryId);
      console.log(request);
    	db.event.create(request)
    	.then(result => {
    		db.eventAssociations.create({
    			eventId: result.id,
    			userId: request.userId,
    			packageRecd: false
    		}).then(assoc => {
    		  res.json(result);          
        }).catch(er => {res.json(er)});
    	}).catch(error => {res.json(error)});
    }).catch(err => {res.json(err)});
  },
//Finds All Active Events
  findAll: function(req, res){
  	db.event.findAll({
  		where: {
  			isActive: true
  		},
  		include: [{
  			model: db.categories,
	      attributes: ['id', 'categoryName']
  		}, {
  			model: db.matchOptions,
	      attributes: ['id', 'matchDescription']
  		}, {
  			model: db.status,
  			attributes: ['id', 'statusName']
  		},{
  			model: db.user,
  			attributes: ['id', 'firstName', 'lastName']
  		}]
  	}).then(data => {res.json(data)})
  	.catch(err => {res.json(err)});
  },
//Finds the one active event by ID
  findById: function(req, res){
  	db.event.findOne({
  		where: {
  			id: req.params.id,
  			isActive: true
  		},
  		include: [{
  			model: db.categories,
	      attributes: ['id', 'categoryName'],
  		}, {
  			model: db.matchOptions,
	      attributes: ['id', 'matchDescription'],
  		}, {
  			model: db.status,
  			attributes: ['id', 'statusName']
  		}, {
  			model: db.user,
  			attributes: ['id', 'firstName', 'lastName']
  		}]
  	}).then(data => {res.json(data)})
  	.catch(err => {res.json(err)});
  },
//Req.params has 2 parameters - option and value.  Filters for Active events
  findByOption: function(req, res){
 		const option = req.params.option;
 		const value = req.params.value;
  	db.event.findAll({
  		where:
				db.sequelize.where(db.sequelize.col(option), value),
  		include: [{
  			model: db.categories,
	      attributes: ['id', 'categoryName'],
  		}, {
  			model: db.matchOptions,
	      attributes: ['id', 'matchDescription'],
  		}, {
  			model: db.status,
  			attributes: ['id', 'statusName']
  		}, {
  			model: db.user,
  			attributes: ['id', 'firstName', 'lastName']
  		}],
      order: [["id", "DESC"]]
  	}).then(data => {
  		let results = [];
  		data.forEach(event => {
  			if(event.isActive){
  				results.push(event);
  			}
  		});
  		res.json(results);
  	})
  	.catch(err => {res.json(err)}); 		 
  },
/* Updates Event - Request:
		eventName
		userId
		organizerAKA = can be NULL
		categoryId (from categories table - pre-sets)
		matchOptionId (from matchOptions table - pre-sets)
		aboutEvent = can be NULL
		signupDeadline = can be NULL
		shipDealine = can be NULL
		isPrivate
		statusName

	1 - Find statusId from statusName (should be pre-populated in status table)
	2 - Create new Event
*/
  update: function(req, res) {
    db.status.findOne({
    	where: {
    		statusName: req.body.statusName
    	}
    }).then(status => {
    	var request = req.body;
    	request.statusId = status.id;
    	db.event.update(request, {
    		where: {
    			id: req.params.id
    		}
    	})
    	.then(result => {
    		res.json(result)
    	}).catch(error => {res.json(err)});
    }).catch(err => {res.json(err)});    
  },
//De-activates an Event
  remove: function(req, res) {
  	db.event.update({
  		isActive: false
  	}, {
  		where: {
  			id: req.params.id
  		}
  	}).then(result => {res.json(result)})
  	.catch(err => {res.json(err)});
  }, 
//Add a User to an event - requires eventId and userId.  Will only allow user to join the same event once
  join: function(req, res){
  	db.eventAssociations.findOrCreate({
  		where: {
  			eventId: req.params.eventid,
  			userId: req.params.userid
  		},
  		defaults: {
	  		eventId: req.params.eventid,
	  		userId: req.params.userid,
	  		packageRecd: false
	  	}
  	}).spread((result, created) => {res.json(result)})
  	.catch(err => {res.json(err)});
  },
//Updates the eventAssociations table for trackingNumber and packageRecd
  eventAssociationUpdate: function(req, res){
		db.eventAssociations.update({
			trackingNumber: req.body.trackingNumber,
			packageRecd: req.body.packageRecd
		}, {
			where: {
				eventId: req.params.eventid,
				userId: req.params.userid
			}
		}).then(result => res.json(result))
		.catch(err => res.json(err));
  },
//Needs to throw error if the user has already been matched - res.status(400).json(json_response);
  eventAssociationLeave: function(req, res){
  	db.eventAssociations.findOne({
  		where: {
  			eventId: req.params.eventid,
  			userId: req.params.userid
  		}
  	}).then(event => {
  		if(event.matchedUserId){
  			let message = {
  				errorResponse: "You can't leave an event once you've been matched."
  			};
  			res.status(400).json(message);
  		} else {
  			db.eventAssociations.destroy({
  				where: {
		  			eventId: req.params.eventid,
		  			userId: req.params.userid  					
  				}
  			}).then(result => {res.json(result)})
  			.catch(error => {res.json(error)});
  		}
  	}).catch(err => {res.json(err)});
  },
/* Runs the matching script for all participants in an event
	 1 - Find Event by eventId
	 2 - Set status to Matching
	 3 - determine Match Option
	 4 - Find All entries in eventAssociations for the event
	 5 - Sort by options
	 6 - loop thru array - each person is matched to the next person in the array.  The last person is matched to the first. (Later feature - swap if the users have been matched previously)
	 7 - Set status to Event In Progress
*/
  match: function(req, res){
  	db.event.findOne({
  		where: {
  			id: req.params.id
  		},
  		include: {
  			model: db.matchOptions,
  			attributes: ['id', 'matchDescription']
  		}
  	}).then(result => {
  		var params = {
  			eventId: result.dataValues.id,
  			matchOptions: result.dataValues.matchOption.dataValues.matchDescription
  		};
  		console.log(params);
  		db.status.findOne({
  			where: {
  				statusName: "Matching"
  			}
  		}).then(status => {
  			db.event.update({
  				statusId: status.dataValues.id
  			}, {
  				where: {
  					id: result.dataValues.id
  				}
  			}).then(data => {
					matchFunction(params, res);  		  				
  			}).catch(error => res.json(error));  			
  		}).catch(er => res.json(er));
  	}).catch(err => res.json(err));
  },
//Returns all Categories
  findAllCategories: function(req, res){
  	db.categories.findAll({})
  	.then(data => {res.json(data)})
  	.catch(err => {res.json(err)});
  },
//Returns all MatchOptions
  findAllMatchOptions: function(req, res){
  	db.matchOptions.findAll({})
  	.then(data => {res.json(data)})
  	.catch(err => {res.json(err)});
  },
//Returns all Events for a User
  findUserEvents: function(req, res){
    const user = req.params.userId;
    console.log(user);
    db.eventAssociations.findAll({
      where: {
        userId: user
      }, 
      include: [{ all: true, nested: true }],
      order: [["eventId", "DESC"]]
    })
    .then(data => {
      console.log(data);
      let result = [];
      data.forEach(eventData => {
        if(eventData.event.isActive == true){
          result.push(eventData);
        }
      })
      res.json(result);
    })
    .catch(err => {res.json(err)});   
  }  

};