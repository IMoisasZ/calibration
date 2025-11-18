/** @format */

/**
 * @fileoverview Utility module for user security operations, including password hashing/comparison (bcrypt)
 * and managing the creation of a default system user upon initialization.
 *
 * @module UserUtils
 * @requires bcrypt
 * @requires userRepository
 * @requires userDefault
 * @requires i18n
 */
import { hash, compare } from 'bcrypt'
import userRepository from '../repositories/user.repository.js'
import { userDefault } from '../data/user_default.data.js'
import i18n from '../config/i18n.config.js'

/**
 * Hashes a plaintext password using bcrypt.
 *
 * @param {string} password - The plaintext password to hash.
 * @param {number} [saltRounds=10] - The cost factor for hashing (default is 10).
 * @returns {Promise<string>} The hashed password string.
 */
async function hashPassword(password, saltRounds = 10) {
	const passwordHashed = await hash(password, saltRounds)
	return passwordHashed
}

/**
 * Compares a plaintext password against a stored hash.
 *
 * @param {string} passedPassword - The password provided by the user (plaintext).
 * @param {string} passwordHashed - The stored hashed password.
 * @returns {Promise<boolean>} True if the passwords match, false otherwise.
 */
async function comparePassword(passedPassword, passwordHashed) {
	return await compare(passedPassword, passwordHashed)
}

/**
 * Creates the default system user if one does not already exist with the default email.
 * This function is designed to be idempotent and is typically run during application startup.
 *
 * @async
 * @returns {Promise<void>} Logs creation success or warning if the user already exists.
 * @throws {Error} If an error occurs during hashing or database creation.
 */
async function createUserDefault() {
	try {
		const existUserByEmail = await userRepository.getUserByEmail(
			userDefault.email
		)

		if (existUserByEmail) {
			// User already exists, log a warning and exit.
			return console.warn(i18n.__('VALIDATION.UTILS.USER.USER_CREATED'), {
				email: userDefault.email,
				password: userDefault.password,
			})
		}

		const newUser = { ...userDefault }

		// Hash the password before saving
		newUser.password = await hashPassword(userDefault.password)

		await userRepository.createUser(newUser)

		// Log credentials for system administrator visibility during bootstrap
		return console.warn(i18n.__('VALIDATION.UTILS.USER.USER_CREDATE'), {
			email: userDefault.email,
			password: userDefault.password,
		})
	} catch (error) {
		console.error(error)
		throw new Error(
			i18n.__('VALIDATION.UTILS.USER.ERROR_TO_CREATE_DEFAULT_USER'),
			error
		)
	}
}

export { createUserDefault, hashPassword, comparePassword }
