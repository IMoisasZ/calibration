/** @format */

import CalibrationAnalysisRepository from '../repositories/calibration_analysis.repository.js'
import { BadRequestError } from '../errors/customErrors.error.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {object} CalibrationAnalysisData
 * @property {number} calibration_id - The ID of the Calibration record being analyzed.
 * @property {string} original_status - The status determined right after calibration (e.g., 'APROVADO').
 * @property {string} decision_status - The final decision status after analysis (e.g., 'APROVADO CONDICIONAL').
 * @property {number} user_id - The ID of the User who performed the analysis.
 * @property {string} notes - The mandatory notes or justification for the analysis decision. Must be at least 15 characters long.
 */

/**
 * Creates a new Calibration Analysis record after applying business logic validations.
 * Utilizes the i18n module for internationalized error messages.
 *
 * @async
 * @param {CalibrationAnalysisData} calibrationAnalysis - The data payload for the new calibration analysis record.
 * @returns {Promise<import('../repositories/calibration_analysis.repository.js').CalibrationAnalysisInstance>} A promise that resolves to the newly created Calibration Analysis instance from the repository.
 * @throws {BadRequestError} If the input data is missing, empty, or if the analysis notes fail the minimum length validation.
 */

async function createCalibrationAnalysis(calibrationAnalysis) {
	if (!calibrationAnalysis || Object.keys(calibrationAnalysis).length === 0) {
		throw new BadRequestError(
			i18n.__('VALIDATION.ANALYSIS_CALIBRATION_NOT_PROVIDE')
		)
	}

	if (calibrationAnalysis.notes.length < 15) {
		throw new BadRequestError(i18n.__('VALIDATION.ANALYSIS_NOTES_ERROR'))
	}

	return await CalibrationAnalysisRepository.createCalibrationAnalysis(
		calibrationAnalysis
	)
}

/**
 * @module CalibrationAnalysisService
 * @description Service layer for creating Calibration Analysis records, enforcing data integrity and business rules.
 */
export default { createCalibrationAnalysis }
