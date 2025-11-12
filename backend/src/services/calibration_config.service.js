/** @format */

import CalibrationConfigRepository from '../repositories/calibration_config.repository.js'
import { BadRequestError, NotFoundError } from '../errors/customErrors.error.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {object} CalibrationConfigData
 * @property {number} factor - The new numeric calibration factor. Must be a positive integer.
 */

/**
 * Validates the new calibration factor, marks the current active configuration as inactive,
 * and creates a new configuration record with the provided factor as the new active one.
 *
 * @async
 * @param {CalibrationConfigData} calibrationConfig - The data payload containing the new factor.
 * @returns {Promise<import('../repositories/calibration_config.repository.js').CalibrationConfigInstance>} A promise that resolves to the newly created and active CalibrationConfig instance.
 * @throws {BadRequestError} If the factor is not a positive integer.
 */

async function updateCalibrationConfigToNoActualAndCreate(calibrationConfig) {
	if (
		typeof calibrationConfig.factor !== 'number' ||
		!Number.isInteger(calibrationConfig.factor) ||
		calibrationConfig.factor <= 0
	) {
		throw new BadRequestError(
			i18n.__('VALIDTION.SERVICES.CALIBRATION_CONFIG.CALIBRATION_FACTOR_ERROR')
		)
	}

	// Delegation of the complex business logic (setting old to false, creating new to true) to the repository.
	return await CalibrationConfigRepository.updateCalibrationConfigToNoActualAndCreate(
		calibrationConfig
	)
}

/**
 * Retrieves a list of Calibration Configuration records.
 * Allows filtering to retrieve only the currently active configuration.
 *
 * @async
 * @param {string} actual - If the string value is 'true', only returns the active configuration (`actual: true`).
 * @returns {Promise<Array<import('../repositories/calibration_config.repository.js').CalibrationConfigInstance>>} An array of CalibrationConfig instances.
 */
async function getAllCalibrationConfig(actual) {
	if (actual === 'true') {
		return await CalibrationConfigRepository.getAllCalibrationConfig({
			actual: true,
		})
	}

	// Returns all configurations if 'actual' is not specified or is not 'true'.
	return await CalibrationConfigRepository.getAllCalibrationConfig({})
}

/**
 * Finds a single Calibration Configuration record by its primary key (ID).
 * Throws a NotFoundError if the record does not exist.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<import('../repositories/calibration_config.repository.js').CalibrationConfigInstance>} A promise that resolves to the found CalibrationConfig instance.
 * @throws {NotFoundError} If no configuration is found with the given ID.
 */
async function getCalibrationConfig(id) {
	const existCalibrationConfig =
		await CalibrationConfigRepository.getCalibrationConfig(id)
	if (!existCalibrationConfig) {
		throw new NotFoundError(
			i18n.__('VALIDATION.SERVICES.ANALYSIS_CONFIG_NOT_FOUND_BY_ID', id)
		)
	}
	return existCalibrationConfig
}

/**
 * @module CalibrationConfigService
 * @description Service layer for managing Calibration Configuration records, enforcing business rules on the calibration factor and managing the active configuration cycle.
 */
export default {
	updateCalibrationConfigToNoActualAndCreate,
	getAllCalibrationConfig,
	getCalibrationConfig,
}
