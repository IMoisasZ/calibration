import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'

const CalibrationPeriodicity = dbConnection.define(
	'calibration_periodicity',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		description: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: 'A descrição deve ser informada!',
				},
			},
		},
		calibration_days: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'A quantidade de dias deve ser iformada!',
				},
			},
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: 'calibration_periodicity',
		hooks: {
			beforeSave: (instance, options) => {
				if (instance.description && typeof instance.description === 'string') {
					instance.description = instance.description.toUpperCase()
				}
			},
		},
	}
)

export default CalibrationPeriodicity
