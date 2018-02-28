module.exports = function(sequelize, DataTypes){

	var user = sequelize.define("user", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
			},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
			},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		streetAddress: {
			type: DataTypes.STRING,
			allowNull: false
			},
		city: {
			type: DataTypes.STRING,
			allowNull: false
			},
		postalCode: {
			type: DataTypes.STRING,
			allowNull: false
		},
		fbUserId: {
			type: DataTypes.STRING,
			allowNull: false
			},
		aboutMe: {
			type: DataTypes.TEXT,
			allowNull: true
			},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
			}
	});
	
	user.associate = function(models){
		user.belongsTo(models.stateProvince, {
			foreignKey: {
				allowNull: false
			}
		});		
		user.belongsTo(models.shippingPreferences, {
			foreignKey: {
				allowNull: false
			}
		});			
		user.hasMany(models.interestsFandomsAssociations, {
			onDelete: "cascade"
		});
		user.hasMany(models.event, {
			onDelete: "cascade"
		});		
	};

	return user;
};