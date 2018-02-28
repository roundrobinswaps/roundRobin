module.exports = function(sequelize, DataTypes){

	var shippingPreferences = sequelize.define("shippingPreferences", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},
		preference: {
			type: DataTypes.STRING,
			allowNull: false,
			}
	});

	shippingPreferences.associate = function(models){
		shippingPreferences.hasMany(models.user, {
			onDelete: "cascade"
		});
	};

	return shippingPreferences;
};