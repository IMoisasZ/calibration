/** @format */

/** @description -> Imports */
import CalibrationAnalysisService from '../services/calibration_analysis.service.js'

const routeName = '/calibration_analysis'

/**
 * @module CalibrationAnalysisController
 * @description Controller layer for handling HTTP requests related to Calibration Analysis resources.
 */

/**
 * @typedef {object} CalibrationAnalysisPayload
 * @property {number} calibration_id - The ID of the parent calibration record.
 * @property {string} original_status - The status determined during the initial calibration check (e.g., 'EM ANALISE', 'APROVADO').
 * @property {string} decision_status - The final decision status (e.g., 'APROVADO CONDICIONAL', 'REPROVADO').
 * @property {number} user_id - The ID of the user who performed the analysis.
 * @property {string} notes - Detailed notes or comments regarding the analysis.
 */

/**
 * Handles the creation of a new Calibration Analysis record.
 * It extracts data from the request body, delegates the creation to the service layer,
 * and sends back the newly created resource with a 201 status.
 *
 * @async
 * @function createCalibrationAnalysis
 * @description Controller responsible for creating a new calibration analysis.
 * Assumes validation middleware has run successfully before reaching this point.
 * @param {import('express').Request<{}, {}, CalibrationAnalysisPayload>} req - Express Request object, containing the analysis body.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the created resource or passes an error to the middleware.
 */
async function createCalibrationAnalysis(req, res, next) {
	try {
		const calibrationAnalysis = req.body

		// Call the service layer to handle business logic and persistence.
		const newCalibrationAnalysis =
			await CalibrationAnalysisService.createCalibrationAnalysis(
				calibrationAnalysis
			)

		// 201 Created Status for resource creation.
		res.status(201).send(newCalibrationAnalysis)

		// ⚠️ LOGGING OPTIMIZED: Log only the created resource ID for security and efficiency.
		const createdId = newCalibrationAnalysis.id || 'N/A'
		const loggerMessage = `POST - ${routeName} - Resource created successfully (ID: ${createdId})`

		// Use global.logger (Winston instance)
		global.logger.info(loggerMessage)
	} catch (error) {
		// Pass any error (DB, logic, etc.) to the central error middleware.
		next(error)
	}
}

export default {
	createCalibrationAnalysis,
}
