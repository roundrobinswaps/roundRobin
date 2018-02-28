module.exports = function(sequelize, DataTypes){

	var categories = sequelize.define("categories", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},
		categoryName: {
			type: DataTypes.STRING,
			allowNull: false,
			}
	});

	categories.associate = function(models){
		categories.hasMany(models.event, {
			onDelete: "cascade"
		});
	};

	return categories;
};