/** @format */

import OwnerService from '../services/owner.service.js'

const routeName = '/owner'

/**
 * @module OwnerController
 * @description Controller layer for managing Owner records.
 * This entity represents the department, sector, or person responsible for equipment.
 */

/**
 * @typedef {object} OwnerPayload
 * @property {string} owner - The name of the owner or responsible entity.
 * @property {number} localization_id - Foreign key linking to the responsible Localization record.
 * @property {boolean} [active=true] - Flag indicating whether this owner record is active.
 */

/**
 * Handles the creation of a new Owner record.
 *
 * @async
 * @function createOwner
 * @param {import('express').Request<{}, {}, OwnerPayload>} req - Express Request object containing the owner data in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the created resource.
 */
async function createOwner(req, res, next) {
	try {
		const owner = req.body
		const newOwner = await OwnerService.createOwner(owner)
		res.status(201).send(newOwner)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(newOwner.id)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Handles the full update (PUT) of an existing Owner record by ID.
 *
 * @async
 * @function updateOwner
 * @param {import('express').Request<{id: number}, {}, OwnerPayload>} req - Express Request object, including the ID in params and update data in body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated resource.
 */
async function updateOwner(req, res, next) {
	try {
		const { id } = req.params
		const owner = req.body
		const alterOwner = await OwnerService.updateOwner(id, owner)

		res.status(200).send(alterOwner)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			alterOwner.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a list of all Owner records.
 * Supports optional filtering by the 'status' (active) query parameter.
 *
 * @async
 * @function getAllOwner
 * @param {import('express').Request<{}, {}, {}, {status: string}>} req - Express Request object, including the optional 'status' query parameter.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the list of owners.
 */
async function getAllOwner(req, res, next) {
	try {
		const { status } = req.query
		const owner = await OwnerService.getAllOwner(status)
		res.status(200).send(owner)
		const loggerMessage = `GET - ${routeName}?status=${status}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a single Owner record by its unique ID.
 *
 * @async
 * @function getOwner
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found owner.
 */
async function getOwner(req, res, next) {
	try {
		const { id } = req.params
		const owner = await OwnerService.getOwner(id)
		res.status(200).send(owner)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Updates only the 'active' status flag (enable/disable) of an Owner record.
 * Uses the PATCH HTTP method for partial update.
 *
 * @async
 * @function updateOwnerStatus
 * @param {import('express').Request<{id: number}, {}, {active: boolean}>} req - Express Request object, including the ID in params and the new 'active' status in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated owner record.
 */
async function updateOwnerStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const owner = await OwnerService.updateOwnerStatus(id, active)
		res.status(200).send(owner)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${
			active ? 'Owner enabled' : 'Owner disabled'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createOwner,
	updateOwner,
	getAllOwner,
	getOwner,
	updateOwnerStatus,
}
