/** @format */

import EquipmentService from '../services/equipment.service.js'

const routeName = '/equipment'

/**
 * @module EquipmentController
 * @description Controller layer for managing Equipment master data records.
 * This entity represents the physical instruments that require calibration.
 */

/**
 * @typedef {object} EquipmentPayload
 * @property {number} equipment_type_id - Foreign key linking to the Equipment Type.
 * @property {string} identifier - A unique identifier for the equipment (e.g., asset tag).
 * @property {string} description - A detailed description of the equipment.
 * @property {string} tag - A short, internal reference tag.
 * @property {string} serial_number - The manufacturer's serial number.
 * @property {string} scale - The measuring scale of the instrument.
 * @property {string} division - The division/resolution of the instrument.
 * @property {string} brand - The equipment's brand.
 * @property {string} model - The equipment's model.
 * @property {number} unity_id - Foreign key linking to the Unit of Measurement.
 * @property {number} owner_id - Foreign key linking to the responsible Owner/Department.
 * @property {number} localization_id - Foreign key linking to the physical location.
 * @property {string} acceptance_criteria - The defined criteria for calibration acceptance.
 * @property {number} calibration_periodicity_id - Foreign key linking to the Calibration Periodicity.
 * @property {boolean} [active=true] - Flag indicating if the equipment is active.
 */

/**
 * Handles the creation of a new Equipment record.
 * Logs the equipment's identifier for tracking purposes, ensuring security and conciseness.
 *
 * @async
 * @function createEquipment
 * @param {import('express').Request<{}, {}, EquipmentPayload>} req - Express Request object containing the equipment data in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the created resource.
 */
async function createEquipment(req, res, next) {
	try {
		const equipment = req.body
		const newEquipment = await EquipmentService.createEquipment(equipment)
		res.status(201).send(newEquipment)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(
			equipment?.identifier
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Handles the full update (PUT) of an existing Equipment record by ID.
 * Logs the equipment's identifier contained in the request body for tracking purposes.
 *
 * @async
 * @function updateEquipment
 * @param {import('express').Request<{id: number}, {}, EquipmentPayload>} req - Express Request object, including the ID in params and update data in body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated resource.
 */
async function updateEquipment(req, res, next) {
	try {
		const { id } = req.params
		const equipment = req.body

		const equipmentDataToUpdate = await EquipmentService.updateEquipment(
			id,
			equipment
		)
		res.status(200).send(equipmentDataToUpdate)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			equipment?.identifier
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a list of all Equipment records.
 * Optionally allows filtering by the 'status' (active) query parameter.
 *
 * @async
 * @function getAllEquipment
 * @param {import('express').Request<{}, {}, {}, {status: string}>} req - Express Request object, including the optional 'status' query parameter.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the list of equipment.
 */
async function getAllEquipment(req, res, next) {
	try {
		const { status } = req.query
		const equipment = await EquipmentService.getAllEquipment(status)
		res.status(200).send(equipment)
		const loggerMessage = `GET - ${routeName}?status=${status} - ${
			status !== 'true' ? 'Show all equipment!' : 'Show just equipment enabled!'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a single Equipment record by its unique primary ID.
 * Logs the equipment's identifier from the retrieved object.
 *
 * @async
 * @function getEquipment
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found equipment.
 */
async function getEquipment(req, res, next) {
	try {
		const { id } = req.params
		const equipment = await EquipmentService.getEquipment(id)
		res.status(200).send(equipment)
		const loggerMessage = `GET - ${routeName}/${id} - ${JSON.stringify(
			equipment?.identifier
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a single Equipment record by its unique business key identifier.
 *
 * @async
 * @function getEquipmentByIdentifier
 * @param {import('express').Request<{identifier: string}>} req - Express Request object, including the unique identifier in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found equipment.
 */
async function getEquipmentByIdentifier(req, res, next) {
	try {
		const { identifier } = req.params
		const equipment = await EquipmentService.getEquipmentByIdentifier(
			identifier
		)
		res.status(200).send(equipment)
		const loggerMessage = `GET - ${routeName}/${identifier} - ${JSON.stringify(
			equipment?.description
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Updates only the 'active' status flag (enable/disable) of an Equipment record.
 * Uses the PATCH method for partial update.
 *
 * @async
 * @function updateEquipmentStatus
 * @param {import('express').Request<{id: number}, {}, {active: boolean}>} req - Express Request object, including the ID in params and the new 'active' status in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated equipment record.
 */
async function updateEquipmentStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const equipment = await EquipmentService.updateEquipmentStatus(id, active)
		res.status(200).send(equipment)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${
			active ? 'Equipment enabled!' : 'Equipment disabled!'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createEquipment,
	updateEquipment,
	getAllEquipment,
	getEquipment,
	getEquipmentByIdentifier,
	updateEquipmentStatus,
}
