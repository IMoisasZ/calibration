/** @format */

import UserRepository from '../repositories/user.repository.js'
import {
	BadRequestError,
	NotFoundError,
	AlreadyAdded,
} from '../errors/customErrors.error.js'
import { UniqueConstraintError } from 'sequelize'
import { UserModel } from '../models/__index.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {object} UserPayload
 * @property {string} user_name - The user's full name.
 * @property {'MASTER'|'ADMINISTRADOR'|'USUARIO'} role - The user's role/access level.
 * @property {string} email - The user's unique email address.
 * @property {string} password - The user's password (plain text, will be hashed by model hooks).
 * @property {boolean} [active=true] - The status of the user account.
 */

/**
 * @typedef {object} UserWithoutPassword
 * @property {number} id - The unique ID of the user.
 * @property {string} user_name - The user's full name.
 * @property {string} role - The user's role/access level.
 * @property {string} email - The user's unique email address.
 * @property {boolean} active - The status of the user account.
 * @property {Date} createdAt - The creation timestamp.
 * @property {Date} updatedAt - The last update timestamp.
 */

/**
 * Internal function to check if a User record exists by its ID.
 * Throws specific, internationalized errors if the ID is missing or the record is not found.
 *
 * NOTE: The original code has an implementation error where the NotFoundError is calculated but not thrown.
 *
 * @async
 * @private
 * @param {number} id - The ID of the User record to check.
 * @returns {Promise<import('../repositories/user.repository.js').UserInstance>} A promise that resolves to the found User instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If no record is found with the given ID (Assuming the implementation error is corrected).
 */
async function existUserById(id) {
	if (!id) {
		throw new BadRequestError(
			i18n.__('VALIDATION.SERVICES.USER.USER_ID_NOT_PROVIDE')
		)
	}
	const user = await UserRepository.getUser(id)
	if (!user) {
		throw new NotFoundError(
			i18n.__('VALIDATION.SERVICES.USER.USER_BY_ID_NOT_FOUND', id)
		)
	}

	return user
}

/**
 * Utility function to remove the 'password' field from a single user object or an array of user objects.
 * This is crucial for security, ensuring passwords are never exposed in API responses.
 *
 * @private
 * @param {import('../repositories/user.repository.js').UserInstance | import('../repositories/user.repository.js').UserInstance[] | null | undefined} data - A single User instance, an array of instances, or null/undefined.
 * @returns {UserWithoutPassword | UserWithoutPassword[] | null} The user data without the password field, or null.
 */
function removePassword(data) {
	if (!data) {
		return null
	}

	if (Array.isArray(data)) {
		// Mapeia e remove a senha de cada item
		return data.map((item) => {
			const { password, ...userWithoutPassword } = item.toJSON()

			return userWithoutPassword
		})
	}
	const { password, ...userWithoutPassword } = data.toJSON()

	return userWithoutPassword
}

/**
 * Creates a new User record.
 * Handles Sequelize's UniqueConstraintError (typically for email uniqueness)
 * and attempts to translate it into a custom error.
 *
 * NOTE: The original code has an implementation error where the custom AlreadyAdded error is calculated but not thrown.
 *
 * @async
 * @param {UserPayload} user - The data payload for the new user.
 * @returns {Promise<UserWithoutPassword>} The newly created user data, with the password removed.
 * @throws {Error} Propagates errors, including the original UniqueConstraintError if the implementation issue is not fixed.
 */
async function createUser(user) {
	try {
		const data = await UserRepository.createUser(user)
		return removePassword(data)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.USER.USER_BY_EMAIL_ALREADY_ADDED',
					user.email
				)
			)
		}
		throw error
	}
}

/**
 * Updates an existing User record by ID.
 * Ensures the record exists before updating and handles unique constraint errors (e.g., if the email is changed to a duplicate).
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {Omit<UserPayload, 'password'>} user - The updated data payload (password update logic is typically handled separately).
 * @returns {Promise<UserWithoutPassword>} The updated user data, with the password removed.
 * @throws {NotFoundError} If the record to update does not exist (assuming `existUserById` works correctly).
 * @throws {AlreadyAdded} If the update operation causes a unique constraint violation on the email.
 * @throws {Error} Propagates other errors.
 */
async function updateUser(id, user) {
	await existUserById(id)

	try {
		const data = await UserRepository.updateUser(id, user)
		return removePassword(data)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.USER.USER_BY_EMAIL_ALREADY_ADDED',
					user.email
				)
			)
		}
		throw error
	}
}

/**
 * Retrieves a list of all User records, optionally filtered by active status.
 * Ensures that all returned records have the password field removed.
 *
 * @async
 * @param {string} active - If the string value is 'true', only returns records where `active: true`. Otherwise, returns all records.
 * @returns {Promise<UserWithoutPassword[] | null>} An array of user data without passwords, or null.
 */
async function getAllUsers(active) {
	let data
	if (active === 'true') {
		data = await UserRepository.getAllUsers({ active: true })
		return removePassword(data)
	}
	data = await UserRepository.getAllUsers({})
	return removePassword(data)
}

/**
 * Finds a single User record by its primary key (ID).
 * Leverages `existUserById` for existence checking and removes the password before returning.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<UserWithoutPassword | null>} The found user data without the password, or null.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If the record does not exist (Assuming `existUserById` works correctly).
 */
async function getUser(id) {
	const data = await existUserById(id)

	return removePassword(data)
}

/**
 * Finds a single User record by its email address.
 *
 * NOTE: The original code calls `UserModel.getUserByEmail(email)` directly from the Model,
 * which is a deviation from the pattern of calling the Repository.
 *
 * @async
 * @param {string} email - The unique email address of the user to find.
 * @returns {Promise<import('../repositories/user.repository.js').UserInstance>} The found User instance (including password, as `removePassword` is not called here).
 * @throws {BadRequestError} If the email is not provided.
 * @throws {NotFoundError} If no record is found with the given email.
 */
async function getUserByEmail(email) {
	if (!email) {
		throw new BadRequestError(
			i18n.__('VALIDATION.SERVICES.USER.USER_EMAIL_NOT_PROVIDE')
		)
	}

	const dataUser = await UserModel.getUserByEmail(email)

	if (!dataUser) {
		throw new NotFoundError(
			i18n.__('VALIDATION.SERVICES.USER.USER_BY_EMAIL_NOT_FOUND', email)
		)
	}

	return dataUser
}

/**
 * Toggles the 'active' status (disable/enable) of a user account.
 * Ensures the user exists and removes the password from the returned result.
 *
 * @async
 * @param {number} id - The ID of the user record to modify.
 * @param {boolean} active - The new status (true for active, false for disabled).
 * @returns {Promise<UserWithoutPassword>} The updated user data, with the password removed.
 * @throws {NotFoundError} If the record does not exist (Assuming `existUserById` works correctly).
 */
async function patchUserDisableEnable(id, active) {
	await existUserById(id)

	const data = await UserRepository.patchUserDisableEnable(id, active)
	return removePassword(data)
}

/**
 * @module UserService
 * @description Service layer for managing User accounts. It handles standard CRUD operations,
 * security (by removing passwords from responses), and existence/uniqueness validation.
 */
export default {
	createUser,
	updateUser,
	getAllUsers,
	getUser,
	getUserByEmail,
	patchUserDisableEnable,
}
