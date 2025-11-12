/** @format */

import UserRepository from '../repositories/user.repository.js'
import { BadRequestError } from '../errors/customErrors.error.js'
import { comparePassword } from '../utils/user.utils.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {object} LoginResponse
 * @property {string} token - The generated JSON Web Token (JWT) used for subsequent authorization requests.
 * @property {object} user - Basic details of the authenticated user.
 * @property {number} user.id - The unique ID of the user.
 * @property {string} user.email - The user's email address.
 * @property {string} user.name - The user's full name (`user_name` from the model).
 * @property {string} user.role - The user's access role (e.g., 'MASTER', 'ADMINISTRADOR', 'USUARIO').
 */

/**
 * Authenticates a user using email and password, and generates a JWT upon successful login.
 * This function is designed to prevent user enumeration attacks by throwing a generic error
 * for both 'user not found' and 'incorrect password' scenarios.
 *
 * @async
 * @param {string} email - The user's email address.
 * @param {string} password - The user's plain text password.
 * @returns {Promise<LoginResponse>} A promise that resolves to an object containing the JWT and basic user data.
 * @throws {BadRequestError} If the password or email format is invalid, or for generic authentication failures (user not found or incorrect password).
 */
async function login(email, password) {
	if (!email) {
		throw new BadRequestError(i18n.__('VALIDATION.SERVICES.EMAIL_NOT_PROVIDE'))
	}

	const user = await UserRepository.getUserByEmail(email)

	const genericError = new BadRequestError(
		i18n.__('VALIDATION.SERVICES.GENERIC_ERROR')
	)

	if (!user) {
		throw genericError
	}

	if (!password) {
		throw new BadRequestError(i18n.__('VALIDATION.SERVICES.PASSWORD'))
	}

	if (!comparePassword(password, user.password)) {
		throw genericError
	}

	// 1. Define the JWT Payload
	const payload = {
		id: user.id,
		email: user.email,
	}

	// 2. Generate the Token
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: '7d', // Token expira em 7 dias
	})

	// 3. Return the Token and basic user data
	return {
		token: token,
		user: {
			id: user.id,
			email: user.email,
			name: user.user_name, // Assuming 'user.user_name' is the field for the user's name
			role: user.role,
		},
	}
}

/**
 * @module UserService
 * @description Service layer for user authentication operations.
 */
export default {
	login,
}
