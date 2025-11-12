/** @format */

import CalibrationResultService from '../services/calibration_result.service.js'

const routeName = '/calibration_result'

/**
 * @module CalibrationResultController
 * @description Controller layer for managing Calibration Result records.
 * This entity stores the specific measurement data and the final outcome (status) for a calibration event.
 */

/**
 * @typedef {object} CalibrationResultPayload
 * @property {number} calibration_id - The ID of the parent calibration record this result belongs to.
 * @property {number} calibration_config_id - The ID of the calibration configuration (factor) used for this result.
 * @property {string} measuring_range - The range of measurement used during the test.
 * @property {number} biggest_deviation - The largest deviation value recorded.
 * @property {number} measurement_uncertainty - The measurement uncertainty (IM).
 * @property {number} biggest_deviation_plus_measurement_uncertainty - The calculated Biggest Deviation + IM.
 * @property {string} [comment] - Optional notes on the result.
 * @property {'APROVADO'|'REPROVADO'} status_result - The final result status (e.g., 'APROVADO', 'REPROVADO').
 */

/**
 * Handles the creation of a new Calibration Result record.
 *
 * NOTE: The logging in this function exposes the full request body, which is a security and performance concern.
 *
 * @async
 * @function createCalibrationResult
 * @param {import('express').Request<{}, {}, CalibrationResultPayload>} req - Express Request object, containing the result body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the created resource.
 */
async function createCalibrationResult(req, res, next) {
	try {
		const calibrationResult = req.body
		const newCalibrationResult =
			await CalibrationResultService.createCalibrationResult(calibrationResult)
		res.status(201).send(newCalibrationResult)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(
			newCalibrationResult.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Handles the full update (PUT) of an existing Calibration Result record by ID.
 *
 * NOTE: The logging in this function exposes the full request body, which is a security and performance concern.
 *
 * @async
 * @function updateCalibrationResult
 * @param {import('express').Request<{id: number}, {}, CalibrationResultPayload>} req - Express Request object, including the ID in params and update data in body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated resource.
 */
async function updateCalibrationResult(req, res, next) {
	try {
		const { id } = req.params
		const calibrationResult = req.body
		const alterCalibrationResult =
			await CalibrationResultService.updateCalibrationResult(
				id,
				calibrationResult
			)
		res.status(200).send(alterCalibrationResult)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			alterCalibrationResult.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a list of all Calibration Result records associated with a specific Calibration ID.
 * This is typically used to view all results for a single calibration event.
 *
 * @async
 * @function getAllCalibrationResultByCalibrationId
 * @param {import('express').Request<{calibration_id: number}>} req - Express Request object, including the parent Calibration ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the list of results.
 */
async function getAllCalibrationResultByCalibrationId(req, res, next) {
	try {
		const { calibration_id } = req.params
		const calibrationResult =
			await CalibrationResultService.getAllCalibrationResultByCalibrationId(
				calibration_id
			)
		res.status(200).send(calibrationResult)
		const loggerMessage = `GET - ${routeName}/calibration/${calibration_id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a single Calibration Result record by its unique ID.
 *
 * @async
 * @function getCalibrationResult
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the result ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found result.
 */
async function getCalibrationResult(req, res, next) {
	try {
		const { id } = req.params
		const calibrationResult =
			await CalibrationResultService.getCalibrationResult(id)
		res.status(200).send(calibrationResult)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Updates only the 'status_result' field (partial update via PATCH) of a Calibration Result record.
 *
 * @async
 * @function updateCalibrationResultStatus
 * @param {import('express').Request<{id: number}, {}, {status_result: 'APROVADO'|'REPROVADO'}>} req - Express Request object, including the ID in params and the new status in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated resource.
 */
async function updateCalibrationResultStatus(req, res, next) {
	try {
		const { id } = req.params
		const { status_result } = req.body
		const calibrationResult =
			await CalibrationResultService.updateCalibrationResultStatus(
				id,
				status_result
			)
		res.status(200).send(calibrationResult)
		const loggerMessage = `PATCH - ${routeName}/${id} - Calibration status = ${status_result}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Deletes a Calibration Result record by its ID.
 *
 * @async
 * @function deleteCalibrationResult
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 204 No Content status on successful deletion.
 */
async function deleteCalibrationResult(req, res, next) {
	try {
		const { id } = req.params
		await CalibrationResultService.deleteCalibrationResult(id)
		res.status(204).end()
		const loggerMessage = `DELETE - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createCalibrationResult,
	updateCalibrationResult,
	getAllCalibrationResultByCalibrationId,
	getCalibrationResult,
	updateCalibrationResultStatus,
	deleteCalibrationResult,
}
