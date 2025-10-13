/** @format */

import { DataTypes } from 'sequelize'
import DbConnection from '../connection/db.connection.js'
import i18n from '../config/i18n.config.js'

const Localization = DbConnection.define(
	'localization',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		description: {
			type: DataTypes.STRING(150),
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.LOCALIZATION.LOCALIZATION_NOT_PROVIDE'),
				},
			},
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: 'localization',
		hooks: {
			beforeValidate: (instance, options) => {
				if (instance.description && typeof instance.description === 'string') {
					instance.description = instance.description.toUpperCase()
				}
			},
		},
	}
)

export default Localization
