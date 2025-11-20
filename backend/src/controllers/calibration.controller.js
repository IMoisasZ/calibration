/** @format */

import CalibrationService from '../services/calibration.service.js'

const routeName = '/calibration'
const BASE_URL_CERTIFICATES = 'uploads/certificates/'

/**
 * @module CalibrationController
 * @description Controller layer for managing Calibration records, including file uploads and analysis status updates.
 */

/**
 * @typedef {object} CalibrationPayload
 * @property {number} user_id - ID of the user who registered the calibration.
 * @property {number} equipment_id - ID of the equipment that was calibrated.
 * @property {string} calibration_date - The date the calibration was performed (YYYY-MM-DD format).
 * @property {string} due_date - The next due date for calibration (YYYY-MM-DD format).
 * @property {string} certificate_number - The unique certificate number.
 * @property {string} [certificate_file] - Path to the uploaded certificate file (for regular creation).
 * @property {string} calibration_status - The status of the calibration (e.g., 'CONCLUIDA', 'AGUARDANDO').
 * @property {boolean} [is_analysis=false] - Flag indicating if the calibration is currently under analysis.
 */

/**
 * Handles the creation of a new Calibration record without attached results or files.
 *
 * @async
 * @function createCalibration
 * @param {import('express').Request<{}, {}, CalibrationPayload>} req - Express Request object containing the calibration data in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the created resource ID.
 */
async function createCalibration(req, res, next) {
	try {
		const calibration = req.body
		const newCalibration = await CalibrationService.createCalibration(
			calibration
		)
		res.status(201).send(newCalibration)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(
			newCalibration.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Handles the full update (PUT) of an existing Calibration record by ID.
 *
 * @async
 * @function updateCalibration
 * @param {import('express').Request<{id: number}, {}, CalibrationPayload>} req - Express Request object, including the ID in params and update data in body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated resource.
 */
async function updateCalibration(req, res, next) {
	try {
		const { id } = req.params
		const calibration = req.body
		const alterCalibration = await CalibrationService.updateCalibration(
			id,
			calibration
		)
		res.status(200).send(alterCalibration)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			alterCalibration.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a list of all Calibration records.
 * Optionally allows filtering by the 'status' query parameter.
 *
 * @async
 * @function getAllCalibrations
 * @param {import('express').Request<{}, {}, {}, {status: string}>} req - Express Request object, including the optional 'status' query parameter.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the list of calibrations.
 */
async function getAllCalibrations(req, res, next) {
	try {
		const { status } = req.query
		const calibration = await CalibrationService.getAllCalibrations(status)
		res.status(200).send(calibration)
		const loggerMessage = `GET - ${routeName}?status=${status}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a list of all Calibration records that are marked as being under analysis.
 *
 * @async
 * @function getAllCalibrationsIsAnalysis
 * @param {import('express').Request} req - Express Request object.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the list of calibrations under analysis.
 */
async function getAllCalibrationsIsAnalysis(req, res, next) {
	try {
		const calibration = await CalibrationService.getAllCalibrationsIsAnalysis()
		res.status(200).send(calibration)
		const loggerMessage = `GET - ${routeName}/calibration_list`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a single Calibration record by its unique ID.
 *
 * @async
 * @function getCalibration
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found calibration.
 */
async function getCalibration(req, res, next) {
	try {
		const { id } = req.params
		const calibration = await CalibrationService.getCalibration(id)
		res.status(200).send(calibration)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Deletes a Calibration record by its ID.
 *
 * @async
 * @function deleteCalibration
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 204 No Content status on successful deletion.
 */
async function deleteCalibration(req, res, next) {
	try {
		const { id } = req.params
		await CalibrationService.deleteCalibration(id)
		res.status(204).end()
		const loggerMessage = `DELETE - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Handles the creation of a new Calibration record along with multiple related Calibration Result records,
 * and processes an optional certificate file upload.
 * Data is expected via `multipart/form-data`, requiring manual JSON parsing.
 *
 * @async
 * @function createCalibrationWithResults
 * @param {import('express').Request<{}, {}, {calibrationData: string, calibrationResults: string, file: object}>} req - Express Request object.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the newly created calibration and its results.
 */
async function createCalibrationWithResults(req, res, next) {
	try {
		const calibrationData = JSON.parse(req.body.calibrationData)

		const calibrationResults = JSON.parse(req.body.calibrationResults)

		const certificateFilePath = req.file
			? `${BASE_URL_CERTIFICATES}${req.file.filename}`
			: null

		const finalData = {
			...calibrationData,
			certificate_file: certificateFilePath, // Agora o caminho do arquivo está aqui
			calibration_results: calibrationResults,
		}

		const newCalibration =
			await CalibrationService.createCalibrationWithResults(finalData)

		const calibrationReturn = res.status(201).send(newCalibration)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(
			calibrationReturn.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Updates the 'is_analysis' flag on a specific Calibration record (partial update).
 * Used to mark a calibration as either under analysis or no longer under analysis.
 *
 * @async
 * @function patchCalibrationByCalibrationAnalysis
 * @param {import('express').Request<{id: number}, {}, {is_analysis: boolean}>} req - Express Request object, including the ID in params and the new analysis status in the body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the updated calibration record.
 */
async function patchCalibrationByCalibrationAnalysis(req, res, next) {
	try {
		const { id } = req.params
		const { is_analysis } = req.body
		const calibration =
			await CalibrationService.patchCalibrationByCalibrationAnalysis(
				is_analysis,
				id
			)
		res.status(200).send(calibration)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${is_analysis}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createCalibration,
	updateCalibration,
	getAllCalibrations,
	getAllCalibrationsIsAnalysis,
	getCalibration,
	deleteCalibration,
	createCalibrationWithResults,
	patchCalibrationByCalibrationAnalysis,
}
