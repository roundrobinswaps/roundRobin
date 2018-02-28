module.exports = function(sequelize, DataTypes){

	var interestsFandoms = sequelize.define("interestsFandoms", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			}
	});

	interestsFandoms.associate = function(models){
		interestsFandoms.hasMany(models.interestsFandomsAssociations, {
			onDelete: "cascade"
		});
	};

	return interestsFandoms;
};