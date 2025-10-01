import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import { CalibrationModel } from './__index.js'

const CalibrationResult = dbConnection.define(
	'calibration_result',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		calibration_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		/**@description -> Faixa de medição */
		measuring_range: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Faixa de medição não informada!',
				},
			},
		},
		/**@description - Resolução ideal */
		optimal_resolution: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Resolução ideal não informada!',
				},
			},
		},
		identifier: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		/**@description -> Condições ambientais */
		environmental_conditions: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		/**@description -> Maior desvio */
		biggest_deviation: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Maior desvio não informado!',
				},
			},
		},
		/**@description -> Incerteza da medição */
		measurement_uncertainty: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Incerteza da medição não informada!',
				},
			},
		},
		/**@description -> Maior desvio + Incerteza da medição */
		biggest_deviation_plus_measurement_uncertainty: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Soma do maior desvio + incerteza da medição, não informado!',
				},
			},
		},
		comment: {
			type: DataTypes.STRING(2000),
			allowNull: true,
		},
		status_result: {
			type: DataTypes.STRING(20),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Status do resultado da calibração não informado!',
				},
				isIn: {
					args: [['APROVADO', 'REPROVADO']],
					msg: 'São aceitos apenas "APROVADO" ou "REPROVADO"',
				},
			},
		},
	},
	{
		tableName: 'calibration_result',
		hooks: {
			beforeSave: (instance, options) => {
				if (
					instance.measuring_range &&
					typeof instance.measuring_range === 'string'
				) {
					instance.measuring_range = instance.measuring_range.toUpperCase()
				}

				if (
					instance.status_result &&
					typeof instance.status_result === 'string'
				) {
					instance.status_result = instance.status_result.toUpperCase()
				}
			},
		},
	}
)

CalibrationResult.belongsTo(CalibrationModel, {
	foreignKey: 'calibration_id',
	onDelete: 'CASCADE',
})
CalibrationModel.hasMany(CalibrationResult, { foreignKey: 'calibration_id' })
export default CalibrationResult
