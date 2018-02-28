module.exports = function(sequelize, DataTypes){

	var matchOptions = sequelize.define("matchOptions", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},
		matchDescription: {
			type: DataTypes.STRING,
			allowNull: false,
			}
	});

	matchOptions.associate = function(models){
		matchOptions.hasMany(models.event, {
			onDelete: "cascade"
		});
	};

	return matchOptions;
};