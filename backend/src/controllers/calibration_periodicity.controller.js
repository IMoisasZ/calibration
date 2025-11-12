/** @format */

import CalibrationPeriodicityService from '../services/calibration_periodicity.service.js'

const routeName = '/calibration_periodicity'

/**
 * @module CalibrationPeriodicityController
 * @description Controller layer for managing Calibration Periodicity records.
 * This entity represents the different intervals for calibration (e.g., Annual, Semiannual).
 */

/**
 * @typedef {object} CalibrationPeriodicityPayload
 * @property {string} description - A descriptive name for the periodicity (e.g., 'SEMESTRAL', 'ANUAL').
 * @property {number} calibration_days - The number of days in the period (e.g., 180, 365).
 * @property {boolean} [active=true] - Indicates if this periodicity option is available.
 */

/**
 * Handles the creation of a new Calibration Periodicity record.
 *
 * NOTE: The logging in this function exposes the full request body, which is a security concern.
 *
 * @async
 * @function createCalibrationPeriodicity
 * @param {import('express').Request<{}, {}, CalibrationPeriodicityPayload>} req - Express Request object, containing the periodicity body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the created resource or passes an error to the middleware.
 */
async function createCalibrationPeriodicity(req, res, next) {
	try {
		const calibrationPeriodicity = req.body
		const newCalibrationPeriodicity =
			await CalibrationPeriodicityService.createCalibrationPeriodicity(
				calibrationPeriodicity
			)
		res.status(201).send(newCalibrationPeriodicity)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(
			newCalibrationPeriodicity.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Handles the full update of an existing Calibration Periodicity record by ID.
 *
 * NOTE: The logging in this function exposes the full request body, which is a security concern.
 *
 * @async
 * @function updateCalibrationPeriodicity
 * @param {import('express').Request<{id: number}, {}, CalibrationPeriodicityPayload>} req - Express Request object, including the ID in params and update data in body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated resource.
 */
async function updateCalibrationPeriodicity(req, res, next) {
	try {
		const { id } = req.params
		const calibrationPeriodicity = req.body
		const alterCalibrationPeriodicity =
			await CalibrationPeriodicityService.updateCalibrationPeriodicity(
				id,
				calibrationPeriodicity
			)
		res.status(200).send(alterCalibrationPeriodicity)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			alterCalibrationPeriodicity.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a list of all Calibration Periodicity records.
 * Allows optional filtering by the 'status' (active) flag via query parameter.
 *
 * @async
 * @function getAllCalibrationPeriodicity
 * @param {import('express').Request<{}, {}, {}, {status: string}>} req - Express Request object, including the optional 'status' query parameter.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the list of periodicities.
 */
async function getAllCalibrationPeriodicity(req, res, next) {
	try {
		const { status } = req.query
		const calibrationPeriodicity =
			await CalibrationPeriodicityService.getAllCalibrationPeriodicity(status)
		res.status(200).send(calibrationPeriodicity)
		const loggerMessage = `GET - ${routeName}?status=${status}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a single Calibration Periodicity record by its ID.
 *
 * @async
 * @function getCalibrationPeriodicity
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found periodicity.
 */
async function getCalibrationPeriodicity(req, res, next) {
	try {
		const { id } = req.params
		const calibrationPeriodicity =
			await CalibrationPeriodicityService.getCalibrationPeriodicity(id)
		res.status(200).send(calibrationPeriodicity)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Updates only the 'active' status flag (enable/disable) of a Calibration Periodicity record.
 *
 * @async
 * @function updateCalibrationPeriodicityStatus
 * @param {import('express').Request<{id: number}, {}, {active: boolean}>} req - Express Request object, including the ID in params and the new 'active' status in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated resource.
 */
async function updateCalibrationPeriodicityStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const calibrationPeriodicity =
			await CalibrationPeriodicityService.updateCalibrationPeriodicityStatus(
				id,
				active
			)
		res.status(200).send(calibrationPeriodicity)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${
			active
				? 'Calibration periodicity was enabled'
				: 'Calibration periodicity was disabled'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createCalibrationPeriodicity,
	updateCalibrationPeriodicity,
	getAllCalibrationPeriodicity,
	getCalibrationPeriodicity,
	updateCalibrationPeriodicityStatus,
}
