/** @format */

import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import i18n from '../config/i18n.config.js'

const EquipmentType = dbConnection.define(
	'equipment_type',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		equipment_type: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.EQUIPMENT_TYPE.EQUIPMENT_TYPE_NOT_PROVIDE'),
				},
			},
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: 'equipment_type',
		hooks: {
			beforeValidate: (instance, options) => {
				if (
					instance.equipment_type?.trim() &&
					typeof instance.equipment_type === 'string'
				) {
					instance.equipment_type = instance.equipment_type.toUpperCase()
				}
			},
		},
	}
)

export default EquipmentType
