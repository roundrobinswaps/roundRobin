module.exports = function(sequelize, DataTypes){

	var stateProvince = sequelize.define("stateProvince", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},
		stateProvinceName: {
			type: DataTypes.STRING,
			allowNull: false,
			},
		isoCode: {
			type: DataTypes.STRING,
			allowNull: true,
			}
	});

	stateProvince.associate = function(models){
		stateProvince.belongsTo(models.country, {
			foreignKey: {
				allowNull: false
			}
		});
	};

	return stateProvince;
};