/** @format */

import LoginService from '../services/login.service.js'

/**
 * @module LoginController
 * @description Controller layer responsible for user authentication and session management.
 */

/**
 * @typedef {object} LoginResponse
 * @property {string} token - The generated JWT (JSON Web Token) for authentication.
 * @property {number} id - The authenticated user's ID.
 * @property {string} user_name - The authenticated user's name.
 * @property {string} email - The authenticated user's email.
 * @property {string} role - The authenticated user's role.
 */

/**
 * Handles the user login process.
 * Authenticates the user based on email and password, generates a JWT,
 * sets the Authorization header, and sends the user data back.
 *
 * @async
 * @function login
 * @param {import('express').Request<{}, {}, {email: string, password: string}>} req - Express Request object containing the email and password in the body.
 * @param {import('express').Response<LoginResponse>} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass authentication errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the user data and token, and sets the 'Authorization' header.
 */
async function login(req, res, next) {
	try {
		const { email, password } = req.body
		const newLogin = await LoginService.login(email, password)
		// Sets the JWT in the standard Authorization header format for client consumption
		res.set('Authorization', `Bearer ${newLogin.token}`)
		res.status(200).send(newLogin)
		const loggerMessage = `POST - /login - ${email} - Created token`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	login,
}
