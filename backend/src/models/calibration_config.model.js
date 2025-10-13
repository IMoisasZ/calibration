/** @format */

import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {import('sequelize').Model} Model
 */

/**
 * Defines the Sequelize model for the 'calibration_config' table.
 * This model stores the currently active numeric factor used for calibration.
 * The 'actual' column indicates which configuration record is currently in use.
 *
 * @type {Model & {
 * /**
 * * Primary key and auto-incrementing ID.
 * * @type {number}
 * *\/
 * id: number,
 * /**
 * * The numeric calibration factor to be applied. Must be provided.
 * * @type {number}
 * *\/
 * factor: number,
 * /**
 * * Indicates whether this is the current and active calibration configuration.
 * * Default is true. Business logic should ensure only one record is active at a time.
 * * @type {boolean}
 * *\/
 * actual: boolean
 * }}
 */

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
					msg: i18n.__('VALIDATION.CALIBRATION_CONFIG.FACTOR_NOT_PROVIDE'),
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
