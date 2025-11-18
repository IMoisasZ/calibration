/** @format */

import LocalizationService from '../services/localization.service.js'

/**
 * @module LocalizationController
 * @description Controller layer for managing Localization records, which represent physical locations or departments.
 */

/**
 * @typedef {object} LocalizationPayload
 * @property {string} description - The descriptive name of the location (e.g., 'FACTORY FLOOR A', 'WAREHOUSE').
 * @property {boolean} [active=true] - Flag indicating whether this location is currently active.
 */

/**
 * Handles the creation of a new Localization record.
 *
 * @async
 * @function createLocalization
 * @param {import('express').Request<{}, {}, LocalizationPayload>} req - Express Request object containing the localization data in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the created resource.
 */
async function createLocalization(req, res, next) {
	try {
		const localization = req.body
		const newLocalization = await LocalizationService.createLocalization(
			localization
		)
		res.status(201).send(newLocalization)

		const loggerMessage = `POST - /localization - ${JSON.stringify(
			newLocalization.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Handles the full update (PUT) of an existing Localization record by ID.
 *
 * @async
 * @function updateLocalization
 * @param {import('express').Request<{id: number}, {}, LocalizationPayload>} req - Express Request object, including the ID in params and update data in body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated resource.
 */
async function updateLocalization(req, res, next) {
	try {
		const { id } = req.params
		const localization = req.body
		const alterLocalization = await LocalizationService.updateLocalization(
			id,
			localization
		)
		res.status(200).send(alterLocalization)

		const loggerMessage = `PUT - /localization/:id=${id} - ${JSON.stringify(
			alterLocalization.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a list of all Localization records.
 * Supports optional filtering by the 'status' query parameter (for active/inactive records).
 *
 * @async
 * @function getAllLocalization
 * @param {import('express').Request<{}, {}, {}, {status: string}>} req - Express Request object, including the optional 'status' query parameter.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the list of localizations.
 */
async function getAllLocalization(req, res, next) {
	try {
		const { status } = req.query
		const localization = await LocalizationService.getAllLocalization(status)
		res.status(200).send(localization)

		const loggerMessage = `GET - /localization - All localizations`
		logger.info(loggerMessage)
	} catch (error) {
		console.log({ error })

		next(error)
	}
}

/**
 * Retrieves a single Localization record by its unique ID.
 *
 * @async
 * @function getLocalization
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found localization.
 */
async function getLocalization(req, res, next) {
	try {
		const { id } = req.params
		const localization = await LocalizationService.getLocalization(id)
		res.status(200).send(localization)

		const loggerMessage = `GET - /localization/:id=${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Updates only the 'active' status flag (enable/disable) of a Localization record.
 * This operation should ideally use the PATCH HTTP method.
 *
 * @async
 * @function updateLocalizationStatus
 * @param {import('express').Request<{id: number}, {}, {active: boolean}>} req - Express Request object, including the ID in params and the new 'active' status in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated localization record.
 */
async function updateLocalizationStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const localization = await LocalizationService.updateLocalizationStatus(
			id,
			active
		)
		res.status(200).send(localization)

		const loggerMessage = active
			? `GET - /localization/:id=${id} - active=${active} - Localization was enabled`
			: `GET - /localization/:id=${id} - active=${active} - Localization was disabled`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createLocalization,
	updateLocalization,
	getAllLocalization,
	getLocalization,
	updateLocalizationStatus,
}
