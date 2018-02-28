module.exports = function(sequelize, DataTypes){

	var event = sequelize.define("event", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},
		eventName: {
			type: DataTypes.STRING,
			allowNull: false,
			},
		organizerAka: {
			type: DataTypes.STRING,
			allowNull: true,
			},
		signupDeadline: {
			type: DataTypes.DATE,
			allowNull: true,
			},
		shipDeadline: {
			type: DataTypes.DATE,
			allowNull: true,
			},
		isPrivate: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
			},
		aboutEvent: {
			type: DataTypes.TEXT,
			allowNull: true,
			},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
			}
	});
	
	event.associate = function(models){
		event.belongsTo(models.user, {
			foreignKey: {
				allowNull: false
			}
		});		
		event.belongsTo(models.categories, {
			foreignKey: {
				allowNull: false
			}
		});		
		event.belongsTo(models.matchOptions, {
			foreignKey: {
				allowNull: false
			}
		});			
		event.belongsTo(models.status, {
			foreignKey: {
				allowNull: false
			}
		});				
	};

	return event;
};