/** @format */

import { UserModel } from '../models/__index.js'

/**
 * @typedef {import('sequelize').Model} UserInstance
 * @typedef {object} UserData
 * @property {string} user_name - The full name of the user.
 * @property {string} role - The user's role (e.g., 'ADMINISTRADOR', 'USUARIO').
 * @property {string} email - The user's unique email address.
 * @property {string} [password] - The user's password (plaintext before hashing hook).
 * @property {boolean} [active=true] - Status indicating if the user account is active.
 */

/**
 * Creates a new User record.
 * Assumes password hashing is handled by Sequelize model hooks (e.g., beforeCreate/beforeSave).
 *
 * @async
 * @param {UserData} user - The data payload for the new user record.
 * @returns {Promise<UserInstance>} A promise that resolves to the newly created User instance.
 */
async function createUser(user) {
	return await UserModel.create(user)
}

/**
 * Updates an existing User record by ID. Includes specific logic for handling password updates
 * to ensure the Sequelize model's password setter/hashing hook is executed correctly.
 *
 * @async
 * @param {number} id - The ID of the User record to update.
 * @param {UserData} user - The updated data payload.
 * @returns {Promise<UserInstance>} A promise that resolves to the updated User instance.
 */
async function updateUser(id, user) {
	const instanceUser = await getUser(id)

	// 1. Lógica para Senha (Se a senha estiver sendo atualizada)
	if (user.password) {
		// A. Se a senha nova for diferente da senha existente (sempre será, pois é hash vs plaintext),
		// ou se não houver senha existente, o 'set' irá marcá-la como alterada.

		// 🚨 NOVO: Use .set() para a senha e depois remova-a do objeto de atualização
		// Isso garante que o setter da senha do Sequelize seja ativado primeiro.
		instanceUser.set('password', user.password)
		delete user.password
	}

	// Object.assign(instanceUser, user)
	instanceUser.set(user)

	await instanceUser.save()
	return await instanceUser
}

/**
 * Retrieves all User records based on an optional WHERE clause.
 *
 * @async
 * @param {object} [whereClause={}] - Optional Sequelize `where` clause for filtering.
 * @returns {Promise<Array<UserInstance>>} A promise that resolves to an array of User instances.
 */
async function getAllUsers(whereClause) {
	return await UserModel.findAll({
		where: whereClause,
	})
}

/**
 * Finds a single User record by its primary key (ID).
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<UserInstance|null>} A promise that resolves to a User instance or null if not found.
 */
async function getUser(id) {
	return await UserModel.findByPk(id)
}

/**
 * Finds a single User record by their unique email address.
 * Includes error handling for robustness during lookup.
 *
 * @async
 * @param {string} email - The email address of the user to find.
 * @returns {Promise<UserInstance|null>} A promise that resolves to a User instance or null if not found or an error occurs.
 */
async function getUserByEmail(email) {
	try {
		return await UserModel.findOne({
			where: {
				email,
			},
		})
	} catch (error) {
		console.log(error)
		return null
	}
}

/**
 * Updates only the 'active' status flag of a User record (Disable/Enable).
 * Uses a direct Model.update query for efficiency and returns the updated instance.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {boolean} active - The new status (true for active/enable, false for inactive/disable).
 * @returns {Promise<UserInstance>} A promise that resolves to the updated User instance.
 */
async function patchUserDisableEnable(id, active) {
	await UserModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getUser(id)
}

/**
 * @module UserRepository
 * @description Repository for handling all CRUD, login, and status operations on the UserModel, including secure password updating.
 */
export default {
	createUser,
	updateUser,
	getAllUsers,
	getUser,
	getUserByEmail,
	patchUserDisableEnable,
}
