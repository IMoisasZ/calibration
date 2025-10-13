/** @format */

import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import { CalibrationModel, UserModel } from './__index.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {import('sequelize').Model} Model
 * @typedef {import('./CalibrationModel').CalibrationModel} CalibrationModel
 * @typedef {import('./UserModel').UserModel} UserModel
 */

/**
 * Defines the Sequelize model for the 'calibration_analysis' table.
 * This model records the analyses and decisions made during calibration processes.
 *
 * @type {Model & {
 * // Static Methods (Associations)
 * belongsTo: function(model: Model, options: object): void,
 * hasMany: function(model: Model, options: object): void,
 *
 * // Instance Properties (belongsTo Relationships)
 * // These are accessible on a loaded instance via .include
 * Calibration: CalibrationModel,
 * User: UserModel
 * }}
 */

const VALID_ORIGINAL_STATUSES = ['EM ANALISE', 'APROVADO', 'REPROVADO']
const VALID_DECISION_STATUSES = ['APROVADO CONDICIONAL', 'REPROVADO']

const CalibrationAnalysis = dbConnection.define(
	'calibration_analysis',
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
		original_status: {
			type: DataTypes.ENUM(...VALID_ORIGINAL_STATUSES),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.CALIBRATION_ANALYSIS.STATUS_NOT_PROVIDE'),
				},
			},
		},
		decision_status: {
			type: DataTypes.ENUM(...VALID_DECISION_STATUSES),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.CALIBRATION_ANALYSIS.DECISION_NOT_PROVIDE'),
				},
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		notes: {
			type: DataTypes.STRING(500),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.CALIBRATION_ANALYSIS..NOTES_NOT_PROVIDED'),
				},
				len: {
					args: [15, 500],
					msg: i18n.__(
						'VALIDATION.CALIBRATION_ANALYSIS..NOTES_LENGTH',
						15,
						500
					),
				},
			},
		},
	},
	{
		tableName: 'calibration_analysis',
		hooks: {
			beforeSave: (instance, option) => {
				if (instance.notes && typeof instance.notes === 'string') {
					instance.notes = instance.notes.toUpperCase()
				}
			},
		},
	}
)
CalibrationAnalysis.belongsTo(CalibrationModel, {
	foreignKey: 'calibration_id',
})
CalibrationModel.hasMany(CalibrationAnalysis, { foreignKey: 'calibration_id' })

CalibrationAnalysis.belongsTo(UserModel, { foreignKey: 'user_id' })
UserModel.hasMany(CalibrationAnalysis, { foreignKey: 'user_id' })

export default CalibrationAnalysis
