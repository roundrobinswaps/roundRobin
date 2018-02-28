module.exports = function(sequelize, DataTypes){

	var status = sequelize.define("status", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},
		statusName: {
			type: DataTypes.STRING,
			allowNull: false,
			}
	});

	status.associate = function(models){
		status.hasMany(models.event, {
			onDelete: "cascade"
		});
	};

	return status;
};