module.exports = function(sequelize, DataTypes){

	var country = sequelize.define("country", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},
		countryName: {
			type: DataTypes.STRING,
			allowNull: false,
			},
		isoCode: {
			type: DataTypes.STRING,
			allowNull: true,
			}
	});

	country.associate = function(models){
		country.hasMany(models.stateProvince, {
			onDelete: "cascade"
		});
	};

	return country;
};