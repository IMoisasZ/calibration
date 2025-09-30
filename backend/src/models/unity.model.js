import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'

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
					msg: 'A unidade não foi informada!',
				},
			},
		},
		tag: {
			type: DataTypes.STRING(5),
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: 'A tag não foi informada!',
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
