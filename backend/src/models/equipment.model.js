/** @format */

import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import {
	CalibrationPeriodicityModel,
	EquipmentTypeModel,
	OwnerModel,
	UnityModel,
} from './__index.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {import('sequelize').Model} Model
 * @typedef {import('./CalibrationPeriodicityModel').CalibrationPeriodicityModel} CalibrationPeriodicityModel
 * @typedef {import('./EquipmentTypeModel').EquipmentTypeModel} EquipmentTypeModel
 * @typedef {import('./OwnerModel').OwnerModel} OwnerModel
 * @typedef {import('./UnityModel').UnityModel} UnityModel
 */

/**
 * Defines the Sequelize model for the 'equipment' table.
 * This model stores the master data for all equipment that requires calibration,
 * including its unique identifier, technical specifications, and organizational links.
 *
 * @type {Model & {
 * // Static Methods (Associations)
 * belongsTo: function(model: Model, options: object): void,
 * hasMany: function(model: Model, options: object): void,
 *
 * // Instance Properties (Columns)
 * /**
 * * Primary key and auto-incrementing ID for the equipment record.
 * * @type {number}
 * *\/
 * id: number,
 * /**
 * * Foreign key linking to the EquipmentType model.
 * * @type {number}
 * *\/
 * equipment_type_id: number,
 * /**
 * * Unique internal identifier for the equipment (e.g., 'EQ-001'). Normalized to uppercase.
 * * @type {string}
 * *\/
 * identifier: string,
 * /**
 * * Detailed description of the equipment. Normalized to uppercase.
 * * @type {string}
 * *\/
 * description: string,
 * /**
 * * Foreign key linking to the OwnerModel (the department or person responsible for the equipment).
 * * @type {number}
 * *\/
 * owner_id: number,
 * /**
 * * The technical division (or resolution) of the equipment, with high precision.
 * * @type {number}
 * *\/
 * division: number,
 * /**
 * * Foreign key linking to the UnityModel (the unit of measurement, e.g., 'kg', 'psi').
 * * @type {number}
 * *\/
 * unity_id: number,
 * /**
 * * The minimum capacity (lower limit) of the equipment's measurement range.
 * * @type {number}
 * *\/
 * min_capacity: number,
 * /**
 * * The maximum capacity (upper limit) of the equipment's measurement range.
 * * @type {number}
 * *\/
 * max_capacity: number,
 * /**
 * * The acceptance criteria (tolerance limit) for calibration results.
 * * @type {number}
 * *\/
 * acceptance_criteria: number,
 * /**
 * * Foreign key linking to the CalibrationPeriodicityModel (how often the equipment must be calibrated).
 * * @type {number}
 * *\/
 * calibration_periodicity_id: number,
 * /**
 * * Flag indicating if the equipment is currently active and in use. Default is true.
 * * @type {boolean}
 * *\/
 * active: boolean,
 *
 * // Instance Properties (belongsTo Relationships - accessible via .include)
 * EquipmentType: EquipmentTypeModel,
 * Owner: OwnerModel,
 * Unity: UnityModel,
 * CalibrationPeriodicity: CalibrationPeriodicityModel
 * }}
 */

const Equipment = dbConnection.define(
	'equipment',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		equipment_type_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.CALIBRATION.EQUIPMENT_TYPE_ID_NOT_PROVIDE'),
				},
			},
		},
		identifier: {
			type: DataTypes.STRING(10),
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.CALIBRATION.IDENTIFIER_NOT_PROVIDE'),
				},
			},
		},
		description: {
			type: DataTypes.STRING(300),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.CALIBRATION.DESCRIPTION_NOT_PROVIDE'),
				},
			},
		},
		owner_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		division: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.CALIBRATION.DIVISION_NOT_PROVIDE'),
				},
			},
		},
		unity_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.CALIBRATION.UNITY_ID_PROVIDE'),
				},
			},
		},
		min_capacity: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.CALIBRATION.MIN_CAPACITY_NOT_PROVIDE'),
				},
			},
		},
		max_capacity: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.CALIBRATION.MAX_CAPACITY_NOT_PROVIDE'),
				},
			},
		},
		acceptance_criteria: {
			type: DataTypes.DECIMAL(10, 4),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALIDATION.CALIBRATION.ACCEPTANCE_CRITERIA_NOT_PROVIDE'
					),
				},
			},
		},
		calibration_periodicity_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__(
						'VALIDATION.CALIBRATION.CALIBRATION_PERIODICITY_ID_NOT_PROVIDE'
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
		tableName: 'equipment',
		hooks: {
			beforeValidate: (instance, options) => {
				if (instance.description && typeof instance.description === 'string') {
					instance.description = instance.description.toUpperCase()
				}

				if (instance.identifier && typeof instance.identifier === 'string') {
					instance.identifier = instance.identifier.toUpperCase()
				}
			},
		},
	}
)

Equipment.belongsTo(EquipmentTypeModel, { foreignKey: 'equipment_type_id' })
EquipmentTypeModel.hasMany(Equipment, { foreignKey: 'equipment_type_id' })

Equipment.belongsTo(OwnerModel, { foreignKey: 'owner_id' })
OwnerModel.hasMany(Equipment, { foreignKey: 'owner_id' })

Equipment.belongsTo(UnityModel, {
	foreignKey: 'unity_id',
})
UnityModel.hasMany(Equipment, { foreignKey: 'unity_id' })

Equipment.belongsTo(CalibrationPeriodicityModel, {
	foreignKey: 'calibration_periodicity_id',
})
CalibrationPeriodicityModel.hasMany(Equipment, {
	foreignKey: 'calibration_periodicity_id',
})

export default Equipment
