import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'

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
					msg: 'Tipo de equipamento não informado!',
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
