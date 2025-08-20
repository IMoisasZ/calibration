import { DataTypes } from 'sequelize'
import DbConnection from '../connection/db.connection.js'

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
					msg: 'A localização deve ser informada!',
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
