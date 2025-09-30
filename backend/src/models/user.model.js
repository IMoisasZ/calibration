import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import { hashPassword } from '../utils/user.utils.js'

const User = dbConnection.define(
	'user',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Nome de usuário não informado!',
				},
			},
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: 'Email não informado!',
				},
				isEmail: {
					msg: 'Informe um email valido!',
				},
			},
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'Senha não informada!',
				},
				len: {
					args: [6, 20],
					msg: 'A senha deve ter no minimo 6 caracteres e no máximo 20!',
				},
			},
		},
		active: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
		},
	},
	{
		tableName: 'user',
		hooks: {
			beforeSave: (instance, option) => {
				if (
					instance.user_name.trim() &&
					typeof instance.user_name === 'string'
				) {
					instance.user_name = instance.user_name.trim().toUpperCase()
				}

				if (instance.changed('password') && instance.password.trim()) {
					instance.password = hashPassword(instance.password)
				}
			},
		},
	}
)

export default User
