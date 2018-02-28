const db = require("../models");

// Defining methods for the userController
module.exports = {
/* Req = {
	firstName
	lastName
	streetAddress
	country - own table
	stateProvnice - own table
	city
	postalCode
	aboutMe - can be null
	interestsFandoms = [] - own table
	shippingPreferenceId (Assume Shipping Pref table already populated - UI should pull both ID and Description for dropdown, and return the ID)
	fbUserId
	oAuthToken
}
Create does these things:
	1 - Find or Create Country
	2 - Find or Create State/Province (requires Country)
	3 - Create User (requires State/Province)
	4 - loop thru insterestsFandoms array and Find or Create each Fandom
		-	In this loop, once the Fandom is found/created, then Create an entry in the interestsFandomsAssociations table for this user/fandom combination
	5 - While the interestsFandoms are being saved (because it's sort of irrelevant to the UI), send JSON of the User
*/
  create: function(req, res) {
    db.country.findOrCreate({
    	where: {
    		countryName: req.body.country
    	},
    	defaults: {
    		countryName: req.body.country
    	}
    }).spread(function(country, created){
    	db.stateProvince.findOrCreate({
    		where: {
    			stateProvinceName: req.body.stateProvince,
    			countryId: country.dataValues.id
    		},
    		defaults:{
    			stateProvinceName: req.body.stateProvince,
    			countryId: country.dataValues.id
    		}
    	}).spread(function(stateProvince, cr){
    		request = req.body;
    		db.user.create({
    			firstName: request.firstName,
    			lastName: request.lastName,
    			streetAddress: request.streetAddress,
    			city: request.city,
    			postalCode: request.postalCode,
    			aboutMe: request.aboutMe,
    			shippingPreferenceId: request.shippingPreferenceId,
    			fbUserId: request.fbUserId,
    			oAuthToken: request.oAuthToken,
    			stateProvinceId: stateProvince.id
    		}).then(function(user){
    			req.body.interestsFandoms.map(interest => {
    				db.interestsFandoms.findOrCreate({
    					where: {
    						description: interest
    					},
    					defaults: {
    						description: interest
    					}
    				}).spread(function(intFan, created){
    					db.interestsFandomsAssociations.create({
    						interestsFandomId: intFan.dataValues.id,
    						userId: user.id
    					});
    				});
    			});
					res.json(user);
    		}).catch(error => res.json(error));
    	}).catch(er => res.json(er));
    }).catch(err => res.json(err));
  },
//Finds All active users (isActive = true), with Full Addresses, Shipping Preferences, and Interests/Fandoms
  findAll: function(req, res){
  	db.user.findAll({
  		where: {
  			isActive: true
  		},
  		include: [{
        model: db.stateProvince,
	      attributes: ['stateProvinceName', 'countryId'],
	      include: [{
	          model: db.country,
	          attributes: ['countryName']
  		}]}, 
  		{
  			model: db.shippingPreferences,
  			attributes: ['id', 'preference']
  		},
  		{
  			model: db.interestsFandomsAssociations,
  			attributes: ['interestsFandomId', 'userId'],
  			include: [{
  				model: db.interestsFandoms,
  				attributes: ['id', 'description']
  			}]
  		}],
  		order: [['lastName', 'ASC'], ['firstName', 'ASC']]
  	}).then(users => {
  		res.json(users);
  	}).catch(err => res.json(err));
  },
//Finds User by User Id - includes Full Address, Shipping Preferences, and Interests/Fandoms.  Returns NULL if not Active
  findById: function(req, res){
  	db.user.findOne({
  		where: {
  			id: req.params.id,
  			isActive: true
  		},
  		include: [{
        model: db.stateProvince,
	      attributes: ['stateProvinceName', 'countryId'],
	      include: [{
	          model: db.country,
	          attributes: ['countryName']
  		}]}, 
  		{
  			model: db.shippingPreferences,
  			attributes: ['id', 'preference']
  		},
  		{
  			model: db.interestsFandomsAssociations,
  			attributes: ['interestsFandomId', 'userId'],
  			include: [{
  				model: db.interestsFandoms,
  				attributes: ['id', 'description']
  			}]
  		}]
  	}).then(user => {
  		res.json(user);
  	}).catch(err => res.json(err));
  },
/* Update a user's data by User ID
Update does these things:
1 - Find or Create Country and State/Province
2 - Update User
3 - Loop thru interestsFandoms, and Find Or Create in InterestsFandoms.  If Create, then also create an entry in the interestsFandomsAssociations table
4 - Return User JSON while doing #3 because that's not necessary for UI
*/
  update: function(req, res) {
    db.country.findOrCreate({
    	where: {
    		countryName: req.body.country
    	},
    	defaults: {
    		countryName: req.body.country
    	}
    }).spread(function(country, created){
    	db.stateProvince.findOrCreate({
    		where: {
    			stateProvinceName: req.body.stateProvince,
    			countryId: country.dataValues.id
    		},
    		defaults:{
    			stateProvinceName: req.body.stateProvince,
    			countryId: country.dataValues.id
    		}
    	}).spread(function(stateProvince, cr){
    		request = req.body;    		
    		var newUser = {
          email: request.email,
    			firstName: request.firstName,
    			lastName: request.lastName,
    			streetAddress: request.streetAddress,
    			city: request.city,
    			postalCode: request.postalCode,
    			aboutMe: request.aboutMe,
    			shippingPreferenceId: request.shippingPreferenceId,
    			stateProvinceId: stateProvince.dataValues.id
    		};
    		console.log(newUser);
    		db.user.update(
    			newUser, 
    			{
    				where: {
    					id: req.params.id
    				}
    			}
    		).then(function(updatedUser){
          if(req.body.interestsFandoms){
            req.body.interestsFandoms.map(interest => {
              db.interestsFandoms.findOrCreate({
                where: {
                  description: interest
                },
                defaults: {
                  description: interest
                }
              }).spread(function(intFan, created){
                db.interestsFandomsAssociations.findOrCreate({
                  where: {
                    interestsFandomId: intFan.dataValues.id,
                    userId: req.params.id
                  },
                  defaults: {
                    interestsFandomId: intFan.dataValues.id,
                    userId: req.params.id                    
                  }
                }).catch(err => res.json(err));
              }).catch(error => res.json(error));
            });
          }
					res.json(updatedUser);
    		}).catch(error => res.json(error));
    	}).catch(er => res.json(er));
    }).catch(err => res.json(err));
  },
//De-activate a user (set isActive = false - do not actually delete from database)
  remove: function(req, res) {
  	db.user.update({
  		isActive: false
  	}, {
  		where: {
  			id: req.params.id
  		}
  	}).then(data => {res.json(data)})
  	.catch(err => {res.json(err)});
  },
//Remove the row in InterestsFandomsAssociations for the user/interestFandom combination (hard delete - no cascading dependencies)
  removeInterestFandom: function(req, res){
		db.interestsFandomsAssociations.destroy({
			where: {
				userId: req.params.userid,
				interestsFandomId: req.params.interestid
			}
		}).then(data => {res.json(data)})
		.catch(err => {res.json(err)});  	
  }
};