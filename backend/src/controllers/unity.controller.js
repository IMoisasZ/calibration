/** @format */

import UnityService from '../services/unity.service.js'

const routeName = '/unity'

/**
 * @module UnityController
 * @description Controller layer for managing Unity (Unit of Measurement) records.
 * This entity represents standard measuring units (e.g., 'KG', 'PSI').
 */

/**
 * @typedef {object} UnityPayload
 * @property {string} description - The full description of the unit (e.g., 'KILOGRAM').
 * @property {string} tag - The short tag or symbol for the unit (e.g., 'KG').
 * @property {boolean} [active=true] - Flag indicating whether this unit is currently active.
 */

/**
 * Handles the creation of a new Unit of Measurement record.
 *
 * @async
 * @function createUnity
 * @param {import('express').Request<{}, {}, UnityPayload>} req - Express Request object containing the unit data in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the created resource.
 */
async function createUnity(req, res, next) {
	try {
		const unity = req.body
		const newUnity = await UnityService.createUnity(unity)
		res.status(201).send(newUnity)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(newUnity.id)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Handles the full update (PUT) of an existing Unit of Measurement record by ID.
 *
 * @async
 * @function updateUnity
 * @param {import('express').Request<{id: number}, {}, UnityPayload>} req - Express Request object, including the ID in params and update data in body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated resource.
 */
async function updateUnity(req, res, next) {
	try {
		const { id } = req.params
		const unity = req.body
		const unityChange = await UnityService.updateUnity(id, unity)
		res.status(200).send(unityChange)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			unityChange.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a list of all Unit of Measurement records.
 * Supports optional filtering by the 'status' (active) query parameter.
 *
 * @async
 * @function getAllUnity
 * @param {import('express').Request<{}, {}, {}, {status: string}>} req - Express Request object, including the optional 'status' query parameter.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the list of units.
 */
async function getAllUnity(req, res, next) {
	try {
		const { status } = req.query
		const unity = await UnityService.getAllUnity(status)
		res.status(200).send(unity)
		const loggerMessage = `GET - ${routeName}?status=${status}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a single Unit of Measurement record by its unique ID.
 *
 * @async
 * @function getUnity
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found unit.
 */
async function getUnity(req, res, next) {
	try {
		const { id } = req.params
		const unity = await UnityService.getUnity(id)
		res.status(200).send(unity)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Updates only the 'active' status flag (enable/disable) of a Unit of Measurement record.
 * Uses the PATCH HTTP method for partial update.
 *
 * @async
 * @function updateUnityStatus
 * @param {import('express').Request<{id: number}, {}, {active: boolean}>} req - Express Request object, including the ID in params and the new 'active' status in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated unit record.
 */
async function updateUnityStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const unity = await UnityService.updateUnityStatus(id, active)
		res.status(200).send(unity)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${
			active ? 'Unity was Enabled' : 'Unity was disabled'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createUnity,
	updateUnity,
	getAllUnity,
	getUnity,
	updateUnityStatus,
}
