import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import { LocalizationModel } from './__index.js'

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
					msg: 'Proprietário não informado!',
				},
			},
		},
		localization_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Localização não informada!',
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
