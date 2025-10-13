/** @format */

import { DataTypes } from 'sequelize'
import dbConnection from '../connection/db.connection.js'
import { hashPassword } from '../utils/user.utils.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {import('sequelize').Model} Model
 */

/**
 * Defines the Sequelize model for the 'user' table.
 * This model manages user authentication details, roles, and status.
 * It enforces password hashing and data normalization through hooks.
 *
 * @type {Model & {
 * // Instance Properties (Columns)
 * /**
 * * Primary key and auto-incrementing ID for the user record.
 * * @type {number}
 * *\/
 * id: number,
 * /**
 * * The full name of the user. Normalized (trimmed and uppercased) before saving.
 * * @type {string}
 * *\/
 * user_name: string,
 * /**
 * * The user's role/access level. Must be one of the predefined roles.
 * * @type {'MASTER'|'ADMINISTRADOR'|'USUARIO'}
 * *\/
 * role: string,
 * /**
 * * The user's unique email address, used for login. Must be unique and follow email format.
 * * @type {string}
 * *\/
 * email: string,
 * /**
 * * The user's password. Stored as a hash (encrypted) in the database.
 * * @type {string}
 * *\/
 * password: string,
 * /**
 * * Flag indicating if the user account is currently active. Default is true.
 * * @type {boolean}
 * *\/
 * active: boolean
 * }}
 */

const VALID_ROLE_STATUS = ['MASTER', 'ADMINISTRADOR', 'USUARIO']

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
					msg: i18n.__('VALIDATION.USER.USER_NOT_PROVIDE'),
				},
			},
		},
		role: {
			type: DataTypes.ENUM(...VALID_ROLE_STATUS),
			allowNull: false,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.USER.ROLE_NOT_PROVIDE'),
				},
			},
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: i18n.__('VALIDATION.USER.EMAIL_NOT_PROVIDE'),
				},
				isEmail: {
					msg: i18n.__('VALIDATION.USER.EMAIL_TYPE_ERROR'),
				},
			},
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
			validate: {
				len: {
					args: [[6, 20]],
					msg: i18n.__('VALIDATION.USER.PASSWORD_LENGTH', 6, 20),
				},
				notEmpty: {
					msg: i18n.__('VALIDATION.USER.PASSWORD_NOT_PROVIDE'),
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
			},

			beforeCreate: async (instance, options) => {
				// Hashing na criação
				if (instance.password) {
					instance.password = await hashPassword(instance.password)
				}
			},

			beforeUpdate: async (instance, options) => {
				if (instance.changed('password')) {
					instance.password = await hashPassword(instance.password)
				}
			},
		},
	}
)

export default User
