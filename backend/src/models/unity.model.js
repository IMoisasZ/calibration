/** @format */

import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {import('sequelize').Model} Model
 */

/**
 * Defines the Sequelize model for the 'unity' lookup table.
 * This table stores the different units of measurement (e.g., 'Kilogram', 'PSI')
 * used by the calibrated equipment.
 *
 * @type {Model & {
 * // Instance Properties (Columns)
 * /**
 * * Primary key and auto-incrementing ID for the unity record.
 * * @type {number}
 * *\/
 * id: number,
 * /**
 * * The full name description of the unit of measurement (e.g., 'KILOGRAM'). Must be unique and is normalized to uppercase.
 * * @type {string}
 * *\/
 * description: string,
 * /**
 * * The short tag or symbol for the unit (e.g., 'KG'). Must be unique, limited to 5 characters, and normalized to uppercase.
 * * @type {string}
 * *\/
 * tag: string,
 * /**
 * * Flag indicating if the unit of measurement is currently active and available for use. Default is true.
 * * @type {boolean}
 * *\/
 * active: boolean
 * }}
 */

const Unity = dbConnection.define(
	'unity',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.UNITY.UNITY_NOT_PROVIDE'),
				},
			},
		},
		tag: {
			type: DataTypes.STRING(5),
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.UNITY.TAG_NOT_PROVIDE'),
				},
			},
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: 'unity',
		hooks: {
			beforeSave: (instance, options) => {
				if (instance.description && typeof instance.description === 'string') {
					instance.description = instance.description.toUpperCase()
				}

				if (instance.tag && typeof instance.tag === 'string') {
					instance.tag = instance.tag.toUpperCase()
				}
			},
		},
	}
)

export default Unity
