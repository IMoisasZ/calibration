/** @format */

import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import { LocalizationModel } from './__index.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {import('sequelize').Model} Model
 * @typedef {import('./LocalizationModel').LocalizationModel} LocalizationModel
 */

/**
 * Defines the Sequelize model for the 'owner' table.
 * This lookup table stores the entities (persons or departments) responsible for equipment,
 * linking each owner to a specific Localization record.
 *
 * @type {Model & {
 * // Static Methods (Associations)
 * belongsTo: function(model: Model, options: object): void,
 * hasMany: function(model: Model, options: object): void,
 *
 * // Instance Properties (Columns)
 * /**
 * * Primary key and auto-incrementing ID for the owner record.
 * * @type {number}
 * *\/
 * id: number,
 * /**
 * * The name of the owner or responsible department. Normalized to uppercase upon save.
 * * @type {string}
 * *\/
 * owner: string,
 * /**
 * * Foreign key linking to the LocalizationModel, defining where the owner/department is located.
 * * @type {number}
 * *\/
 * localization_id: number,
 * /**
 * * Flag indicating if this owner record is currently active and available for assignment.
 * * Default is true.
 * * @type {boolean}
 * *\/
 * active: boolean,
 *
 * // Instance Properties (belongsTo Relationships - accessible via .include)
 * Localization: LocalizationModel
 * }}
 */

const Owner = dbConnection.define(
	'owner',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		owner: {
			type: DataTypes.STRING(200),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.OWNER.OWNER_NOT_PROVIDE'),
				},
			},
		},
		localization_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.OWNER.LOCALIZATION_ID_NOT_PROVIDE'),
				},
			},
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: 'owner',
		hooks: {
			beforeSave: (instance, options) => {
				if (instance.owner && typeof instance.owner === 'string') {
					instance.owner = instance.owner.toUpperCase()
				}
			},
		},
	}
)

Owner.belongsTo(LocalizationModel, { foreignKey: 'localization_id' })
LocalizationModel.hasMany(Owner, { foreignKey: 'localization_id' })

export default Owner
