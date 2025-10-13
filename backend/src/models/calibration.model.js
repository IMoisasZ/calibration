/** @format */

import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import { EquipmentModel, UserModel } from './__index.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {import('sequelize').Model} Model
 * @typedef {import('./EquipmentModel').EquipmentModel} EquipmentModel
 * @typedef {import('./UserModel').UserModel} UserModel
 */

/**
 * Defines the Sequelize model for the 'calibration' table.
 * This model records a calibration event, linking it to a user and equipment,
 * and tracking its status and important dates.
 *
 * @type {Model & {
 * // Static Methods (Associations)
 * belongsTo: function(model: Model, options: object): void,
 * hasMany: function(model: Model, options: object): void,
 *
 * // Instance Properties (Columns)
 * /**
 * * Primary key and auto-incrementing ID.
 * * @type {number}
 * *\/
 * id: number,
 * /**
 * * Foreign key linking to the User who performed or registered the calibration.
 * * @type {number}
 * *\/
 * user_id: number,
 * /**
 * * Foreign key linking to the Equipment that was calibrated.
 * * @type {number}
 * *\/
 * equipment_id: number,
 * /**
 * * The date on which the calibration was performed.
 * * @type {Date}
 * *\/
 * calibration_date: Date,
 * /**
 * * The date when the next calibration is due.
 * * @type {Date}
 * *\/
 * next_calibration: Date,
 * /**
 * * The unique identifier (number) of the calibration certificate. Normalized to uppercase.
 * * @type {string}
 * *\/
 * certificate_number: string,
 * /**
 * * Optional path or identifier for the certificate file/document.
 * * @type {string | null}
 * *\/
 * certificate_file: string | null,
 * /**
 * * The overall status of the calibration result.
 * * @type {'EM ANALISE'|'APROVADO'|'REPROVADO'}
 * *\/
 * calibration_status: string,
 * /**
 * * Boolean flag indicating if this calibration record has an associated analysis record.
 * * Default is false.
 * * @type {boolean}
 * *\/
 * is_analysis: boolean,
 *
 * // Instance Properties (belongsTo Relationships)
 * Equipment: EquipmentModel,
 * User: UserModel
 * }}
 */

const VALID_CALIBRATION_STATUS = ['EM ANALISE', 'APROVADO', 'REPROVADO']

const Calibration = dbConnection.define(
	'calibration',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALID_CALIBRATION_STATUS.CALIBRATION.USER_NOT_PROVIDE'),
				},
			},
		},
		equipment_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALID_CALIBRATION_STATUS.CALIBRATION.EQUIPMENT_NOT_PROVIDE'
					),
				},
			},
		},
		calibration_date: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALID_CALIBRATION_STATUS.CALIBRATION.CALIBRATION_DATE_NOT_PROVIDE'
					),
				},
				isDate: {
					msg: i18n.__(
						'VALID_CALIBRATION_STATUS.CALIBRATION.CALIBRATION_DATE_TYPE_ERROR'
					),
				},
			},
		},
		next_calibration: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALID_CALIBRATION_STATUS.CALIBRATION.CALIBRATION_DATE_TYPE_ERROR'
					),
				},
				isDate: {
					msg: i18n.__(
						'VALID_CALIBRATION_STATUS.CALIBRATION.NEXT_CALIBRATION_TYPE_ERROR'
					),
				},
			},
		},
		certificate_number: {
			type: DataTypes.STRING(15),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALID_CALIBRATION_STATUS.CALIBRATION.CERTIFICATE_NUMBER_NOT_PROVIDE'
					),
				},
			},
		},
		certificate_file: {
			type: DataTypes.STRING(500),
			allowNull: true,
		},
		calibration_status: {
			type: DataTypes.ENUM(...VALID_CALIBRATION_STATUS),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALID_CALIBRATION_STATUS.CALIBRATION.CALIBRATION_STATUS_NOT_PROVIDE'
					),
				},
			},
		},
		is_analysis: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		tableName: 'calibration',
		hooks: {
			beforeSave: (instance, options) => {
				if (
					instance.certificate_number &&
					typeof instance.certificate_number === 'string'
				) {
					instance.certificate_number =
						instance.certificate_number.toUpperCase()
				}
				if (
					instance.calibration_status &&
					typeof instance.calibration_status === 'string'
				) {
					instance.calibration_status =
						instance.calibration_status.toUpperCase()
				}
			},
		},
	}
)

Calibration.belongsTo(EquipmentModel, { foreignKey: 'equipment_id' })
EquipmentModel.hasMany(Calibration, { foreignKey: 'equipment_id' })

Calibration.belongsTo(UserModel, { foreignKey: 'user_id' })
UserModel.hasMany(Calibration, { foreignKey: 'user_id' })

export default Calibration
