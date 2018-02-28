module.exports = function(sequelize, DataTypes){

	var eventAssociations = sequelize.define("eventAssociations", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},
		trackingNumber: {
			type: DataTypes.STRING,
			allowNull: true,
			},
		packageRecd: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			}
	});

	eventAssociations.associate = function(models){
		eventAssociations.belongsTo(models.event, {
			foreignKey: {
				allowNull: false
			}
		});
		eventAssociations.belongsTo(models.user, {
			foreignKey: {
				allowNull: false
			}			
		});
		eventAssociations.belongsTo(models.user, {
			as: "matchedUser",
			foreignKey: {
				allowNull: true
			}			
		});
	};
	
	return eventAssociations;
};