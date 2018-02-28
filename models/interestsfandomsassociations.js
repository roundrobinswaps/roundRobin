module.exports = function(sequelize, DataTypes){

	var interestsFandomsAssociations = sequelize.define("interestsFandomsAssociations", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},

	});

	interestsFandomsAssociations.associate = function(models){
		interestsFandomsAssociations.belongsTo(models.interestsFandoms, {
			foreignKey: {
				allowNull: false
			}
		});
		interestsFandomsAssociations.belongsTo(models.user, {
			foreignKey: {
				allowNull: false
			}			
		});
	};
	
	return interestsFandomsAssociations;
};