/** @format */

import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {import('sequelize').Model} Model
 */

/**
 * Defines the Sequelize model for the 'calibration_periodicity' table.
 * This lookup table stores the different calibration intervals available
 * (e.g., 'Annual', 'Semiannual') and the corresponding number of days.
 *
 * @type {Model & {
 * // Instance Properties (Columns)
 * /**
 * * Primary key and auto-incrementing ID for the periodicity record.
 * * @type {number}
 * *\/
 * id: number,
 * /**
 * * A descriptive name for the periodicity (e.g., 'SEMESTRAL', 'ANUAL').
 * * This field must be unique.
 * * @type {string}
 * *\/
 * description: string,
 * /**
 * * The number of days corresponding to this calibration interval.
 * * Used for calculating the next due date.
 * * @type {number}
 * *\/
 * calibration_days: number,
 * /**
 * * Indicates whether this periodicity option is currently active and available for selection.
 * * @type {boolean}
 * *\/
 * active: boolean
 * }}
 */

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
					msg: i18n.__(
						'VALIDATION.CALIBRATION_PERIODICITY.PERIODICITY_CALIBRATION_DESCRITION_NOT_PROVIDE'
					),
				},
			},
		},
		calibration_days: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALIDATION.CALIBRATION_PERIODICITY.QUANTITY_DAYS_PERIODICITY_NOT_PROVIDE'
					),
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
