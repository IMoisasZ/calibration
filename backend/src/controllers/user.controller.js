/** @format */

import UserService from '../services/user.service.js'

const pathName = '/user'

/**
 * @module UserController
 * @description Controller layer for managing User records (administration, authentication details, and roles).
 */

/**
 * @typedef {object} UserPayload
 * @property {string} user_name - The full name of the user.
 * @property {string} email - The user's unique email address.
 * @property {string} password - The user's plain-text password (for creation/update).
 * @property {'MASTER'|'ADMINISTRADOR'|'USUARIO'} role - The access role of the user.
 * @property {boolean} [active=true] - Flag indicating if the user is currently enabled.
 */

/**
 * Handles the creation of a new User record.
 *
 * @async
 * @function createUser
 * @param {import('express').Request<{}, {}, UserPayload>} req - Express Request object containing the user data in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the created resource.
 */
async function createUser(req, res, next) {
	try {
		const user = req.body
		const newUser = await UserService.createUser(user)
		res.status(201).send(newUser)
		const loggerMessage = `POST - ${pathName} - ${JSON.stringify(newUser.id)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Handles the full update (PUT) of an existing User record by ID.
 *
 * @async
 * @function updateUser
 * @param {import('express').Request<{id: number}, {}, UserPayload>} req - Express Request object, including the ID in params and update data in body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated resource.
 */
async function updateUser(req, res, next) {
	try {
		const { id } = req.params
		const user = req.body
		const alterUser = await UserService.updateUser(id, user)
		res.status(200).send(alterUser)
		const loggerMessage = `PUT - ${pathName}/${id} - ${JSON.stringify(
			alterUser.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a list of all User records.
 * Supports optional filtering by the 'active' query parameter.
 *
 * @async
 * @function getAllUsers
 * @param {import('express').Request<{}, {}, {}, {active: string}>} req - Express Request object, including the optional 'active' query parameter.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the list of users.
 */
async function getAllUsers(req, res, next) {
	try {
		const { active } = req.query
		const user = await UserService.getAllUsers(active)
		res.status(200).send(user)
		const loggerMessage = `GET - ${pathName}?active=${active}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a single User record by its unique primary ID.
 *
 * @async
 * @function getUser
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found user.
 */
async function getUser(req, res, next) {
	try {
		const { id } = req.params
		const user = await UserService.getUser(id)
		res.status(200).send(user)
		const loggerMessage = `GET - ${pathName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a single User record by its unique email address, provided as a query parameter.
 *
 * @async
 * @function getUserByEmail
 * @param {import('express').Request<{}, {}, {}, {email: string}>} req - Express Request object, including the email in the query parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found user.
 */
async function getUserByEmail(req, res, next) {
	try {
		const { email } = req.query
		const user = await UserService.getUserByEmail(email)
		res.status(200).send(user)
		const loggerMessage = `GET - ${pathName}/user?email=${email}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Updates only the 'active' status flag (enable/disable) of a User record.
 * Uses the PATCH HTTP method for partial update.
 *
 * @async
 * @function patchUserDisableEnable
 * @param {import('express').Request<{id: number}, {}, {active: boolean}>} req - Express Request object, including the ID in params and the new 'active' status in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated user record.
 */
async function patchUserDisableEnable(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const user = await UserService.patchUserDisableEnable(id, active)
		res.status(200).send(user)
		const loggerMessage = `PATCH - ${pathName}/${id} - ${
			active ? 'User was enabled' : 'User was disabled'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createUser,
	updateUser,
	getAllUsers,
	getUser,
	getUserByEmail,
	patchUserDisableEnable,
}
