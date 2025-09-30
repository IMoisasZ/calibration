import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'

const CalibrationConfig = dbConnection.define(
	'calibration_config',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		factor: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Fator não informado!',
				},
			},
		},
		actual: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{ tableName: 'calibration_config' }
)

export default CalibrationConfig
