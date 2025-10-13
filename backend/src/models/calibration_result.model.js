/** @format */

import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import { CalibrationConfigModel, CalibrationModel } from './__index.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {import('sequelize').Model} Model
 */

/**
 * Defines the Sequelize model for the 'calibration_status' lookup table.
 * This table stores the possible states (e.g., 'In Use', 'Out of Service', 'Calibrated')
 * that a calibration item can have.
 *
 * @type {Model & {
 * // Instance Properties (Columns)
 * /**
 * * Primary key and auto-incrementing ID for the status record.
 * * @type {number}
 * *\/
 * id: number,
 * /**
 * * A unique, descriptive name for the calibration status (e.g., 'CALIBRATED', 'IN USE').
 * * This field is normalized to uppercase upon save.
 * * @type {string}
 * *\/
 * description: string,
 * /**
 * * Indicates whether this status option is currently active and available for use.
 * * Default is true.
 * * @type {boolean}
 * *\/
 * active: boolean
 * }}
 */

const VALID_STATUS_RESULT = ['APROVADO', 'REPROVADO']

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
		factor_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		/**
		 * Faixa de medição
		 */
		measuring_range: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALIDATION.CALIBRATION_RESULT.MEASURING_RANGE_NOT_PROVIDE'
					),
				},
			},
		},
		/**
		 * Resolução ideal
		 */
		optimal_resolution: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALIDATION.CALIBRATION_RESULT.OPTIMAL_RESOLUTION_NOT_PROVIDE'
					),
				},
			},
		},
		identifier: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		/**
		 * Condições ambientais
		 */
		environmental_conditions: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		/**
		 * Maior desvio
		 */
		biggest_deviation: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALIDATION.CALIBRATION_RESULT.BIGGEST_DEVIATION_NOT_PROVIDE'
					),
				},
			},
		},
		/**
		 * Incerteza da medição
		 */
		measurement_uncertainty: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALIDATION.CALIBRATION_RESULT.MEASUREMENT_UNCERTAINTY_NOT_PROVIDE'
					),
				},
			},
		},
		/**
		 * Maior desvio + Incerteza da medição
		 */
		biggest_deviation_plus_measurement_uncertainty: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.CALIBRATION_RESULT.MD+IM_NOT_PROVIDE'),
				},
			},
		},
		comment: {
			type: DataTypes.STRING(2000),
			allowNull: true,
		},
		status_result: {
			type: DataTypes.ENUM(...VALID_STATUS_RESULT),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALIDATION.CALIBRATION_RESULT.STATUS_RESULT_NOT_PROVIDE'
					),
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

CalibrationResult.belongsTo(CalibrationConfigModel, { foreignKey: 'factor_id' })
CalibrationConfigModel.hasMany(CalibrationResult, { foreignKey: 'factor_id' })
export default CalibrationResult
