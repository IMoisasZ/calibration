/** @format */

import EquipmentTypeService from '../services/equipment_type.service.js'

const routeName = '/equipment_type'

/**
 * @module EquipmentTypeController
 * @description Controller layer for managing Equipment Type records.
 * This entity represents categories of equipment (e.g., 'MANOMETER', 'THERMOMETER').
 */

/**
 * @typedef {object} EquipmentTypePayload
 * @property {string} equipment_type - The descriptive name of the equipment type.
 * @property {boolean} [active=true] - Indicates whether this type is currently active and available for use.
 */

/**
 * Handles the creation of a new Equipment Type record.
 *
 * NOTE: The presence of a `console.log` before the response is sent is generally unnecessary
 * and should be removed in production environments.
 *
 * @async
 * @function createEquipmentType
 * @param {import('express').Request<{}, {}, EquipmentTypePayload>} req - Express Request object containing the equipment type data in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the created resource.
 */
async function createEquipmentType(req, res, next) {
	try {
		const equipmentType = req.body
		const newEquipmentType = await EquipmentTypeService.createEquipmentType(
			equipmentType
		)

		res.status(201).send(newEquipmentType)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(
			newEquipmentType.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Handles the full update (PUT) of an existing Equipment Type record by ID.
 *
 * @async
 * @function updateEquipmentType
 * @param {import('express').Request<{id: number}, {}, EquipmentTypePayload>} req - Express Request object, including the ID in params and update data in body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated resource.
 */
async function updateEquipmentType(req, res, next) {
	try {
		const { id } = req.params
		const equipmentType = req.body
		const equipmentTypeUpdate = await EquipmentTypeService.updateEquipmentType(
			id,
			equipmentType
		)

		res.status(200).send(equipmentTypeUpdate)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			equipmentTypeUpdate.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a list of all Equipment Type records.
 * Optionally allows filtering by the 'status' (active) flag via query parameter.
 *
 * @async
 * @function getAllEquipmentType
 * @param {import('express').Request<{}, {}, {}, {status: string}>} req - Express Request object, including the optional 'status' query parameter.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the list of equipment types.
 */
async function getAllEquipmentType(req, res, next) {
	try {
		const { status } = req.query
		const equipmentType = await EquipmentTypeService.getAllEquipmentType(status)
		res.status(200).send(equipmentType)
		const loggerMessage = `GET - ${routeName}?status=${status}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a single Equipment Type record by its unique ID.
 *
 * @async
 * @function getEquipmentType
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found equipment type.
 */
async function getEquipmentType(req, res, next) {
	try {
		const { id } = req.params
		const equipmentType = await EquipmentTypeService.getEquipmentType(id)
		res.status(200).send(equipmentType)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Updates only the 'active' status flag (enable/disable) of an Equipment Type record.
 *
 * @async
 * @function updateEquipmentTypeStatus
 * @param {import('express').Request<{id: number}, {}, {active: boolean}>} req - Express Request object, including the ID in params and the new 'active' status in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated equipment type record.
 */
async function updateEquipmentTypeStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const equipmentType = await EquipmentTypeService.updateEquipmentTypeStatus(
			id,
			active
		)
		res.status(200).send(equipmentType)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${
			active ? `Equipment enabled` : `Equipment disabled`
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createEquipmentType,
	updateEquipmentType,
	getAllEquipmentType,
	getEquipmentType,
	updateEquipmentTypeStatus,
}
