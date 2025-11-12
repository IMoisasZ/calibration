/** @format */

import CalibrationResultRepository from '../repositories/calibration_result.repository.js'
import CalibrationRepository from '../repositories/calibration.repository.js'
import EquipmentRepository from '../repositories/equipment.repository.js'
import { BadRequestError, NotFoundError } from '../errors/customErrors.error.js'
import {
	biggestDeviationPlusMeasurementUncertainty,
	optimalResolution,
	statusResult,
} from '../utils/calibration_result.utils.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {object} CalibrationResultPayload
 * @property {number} calibration_id - Foreign key to the Calibration record this result belongs to.
 * @property {number} measuring_range - The measuring range value tested.
 * @property {number} biggest_deviation - The largest measured deviation value.
 * @property {number} measurement_uncertainty - The calculated measurement uncertainty.
 * @property {string} [comment] - Optional comments on the calibration result.
 * @property {number} [optimal_resolution] - Calculated optimal resolution (set internally).
 * @property {number} [biggest_deviation_plus_measurement_uncertainty] - Calculated deviation + uncertainty (set internally).
 * @property {string} [status_result] - Calculated final status (e.g., 'APROVADO', 'REPROVADO') (set internally).
 */

/**
 * Internal function to check if a Calibration Result record exists by its ID.
 * Throws specific, internationalized errors if the ID is missing or the record is not found.
 *
 * @async
 * @param {number} id - The ID of the Calibration Result record to check.
 * @returns {Promise<import('../repositories/calibration_result.repository.js').CalibrationResultInstance>} The found Calibration Result instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If no record is found with the given ID.
 */
async function existCalibrationResultById(id) {
	if (!id) {
		throw new BadRequestError(
			i18n.__('VALIDATION.SERVICES.CALIBRATION_RESULT.ID_NOT_PROVIDE')
		)
	}
	const calibrationResult =
		await CalibrationResultRepository.getCalibrationResult(id)
	if (!calibrationResult) {
		throw new NotFoundError(
			i18n.__(
				'VALIDATION.SERVICES.CALIBRATION_RESULT.CALIBRATION_RESULT_NOT_FOUND'
			)
		)
	}
	return calibrationResult
}

/**
 * Internal function to check if any Calibration Result records exist for a given Calibration ID.
 * Throws specific, internationalized errors if the Calibration ID is missing or no results are found.
 *
 * @async
 * @param {number} calibration_id - The ID of the parent Calibration record.
 * @returns {Promise<Array<import('../repositories/calibration_result.repository.js').CalibrationResultInstance>>} An array of found Calibration Result instances.
 * @throws {BadRequestError} If the Calibration ID is not provided.
 * @throws {NotFoundError} If no calibration results are found for the given Calibration ID.
 */
async function existCalibrationResultByCalibrationId(calibration_id) {
	if (!calibration_id) {
		throw new BadRequestError(
			i18n.__(
				'VALIDATION.SERVICES.CALIBRATION_RESULT.CALIBRATION_ID_NOT_PROVIDE'
			)
		)
	}
	const calibrationResult =
		await CalibrationResultRepository.getAllCalibrationResultByCalibrationId(
			calibration_id
		)
	if (calibrationResult.length === 0) {
		throw new NotFoundError(
			i18n.__(
				'VALIDATION.SERVICES.CALIBRATION_RESULT.CALIBRATION_RESULT_BY_CALIBRATION_ID_NOT_FOUND'
			)
		)
	}
	return calibrationResult
}

/**
 * Private function responsible for fetching necessary equipment data and calculating
 * the final technical fields for a calibration result.
 *
 * @async
 * @private
 * @param {CalibrationResultPayload} calibrationResult - The mutable calibration result data object.
 * @returns {Promise<CalibrationResultPayload>} The updated calibration result object with calculated fields.
 * @throws {NotFoundError} If the associated Equipment cannot be found.
 * @throws {BadRequestError} If the associated Equipment does not have an Acceptance Criteria defined, which is necessary for calculation.
 */
async function _processCalibrationResultData(calibrationResult) {
	// 1. Get equipment ID from the Calibration record
	const { equipment_id } = await CalibrationRepository.getCalibration(
		calibrationResult.calibration_id
	)

	// 2. Get equipment details
	const equipment = await EquipmentRepository.getEquipment(equipment_id)

	if (!equipment) {
		throw new NotFoundError(
			i18n.__('VALIDATION.SERVICES.CALIBRATION_RESULT.EQUIPMENT_NOT_FOUND')
		)
	}

	const { acceptance_criteria } = equipment

	// 3. Validate necessary acceptance criteria
	if (
		acceptance_criteria === null ||
		typeof acceptance_criteria === 'undefined'
	) {
		throw new BadRequestError(
			i18n.__(
				'VALIDATION.SERVICES.CALIBRATION_RESULT.ACCEPTANCE_CRITERIA_NOT_PROVIDE'
			)
		)
	}

	// 4. Perform technical calculations and update the payload
	calibrationResult.optimal_resolution = optimalResolution(
		Number(acceptance_criteria),
		2 // Assuming '2' is a fixed or default value for the resolution factor
	)

	calibrationResult.biggest_deviation_plus_measurement_uncertainty =
		biggestDeviationPlusMeasurementUncertainty(
			calibrationResult.biggest_deviation,
			calibrationResult.measurement_uncertainty
		)

	calibrationResult.status_result = statusResult(
		Number(acceptance_criteria),
		calibrationResult.biggest_deviation,
		calibrationResult.measurement_uncertainty
	)

	return calibrationResult
}

/**
 * Creates a new Calibration Result record after performing business logic and technical calculations.
 *
 * @async
 * @param {CalibrationResultPayload} calibrationResult - The data payload for the new result.
 * @returns {Promise<import('../repositories/calibration_result.repository.js').CalibrationResultInstance>} The newly created Calibration Result instance.
 * @throws {Error} Throws errors from `_processCalibrationResultData` if dependencies or criteria are missing.
 */
async function createCalibrationResult(calibrationResult) {
	await _processCalibrationResultData(calibrationResult)
	return await CalibrationResultRepository.createCalibrationResult(
		calibrationResult
	)
}

/**
 * Updates an existing Calibration Result record after ensuring existence and re-calculating technical fields.
 *
 * @async
 * @param {number} id - The ID of the Calibration Result record to update.
 * @param {CalibrationResultPayload} calibrationResult - The updated data payload.
 * @returns {Promise<import('../repositories/calibration_result.repository.js').CalibrationResultInstance>} The updated Calibration Result instance.
 * @throws {NotFoundError} If the record does not exist.
 * @throws {Error} Throws errors from `_processCalibrationResultData` if dependencies or criteria are missing.
 */
async function updateCalibrationResult(id, calibrationResult) {
	await existCalibrationResultById(id)
	await _processCalibrationResultData(calibrationResult)

	return await CalibrationResultRepository.updateCalibrationResult(
		id,
		calibrationResult
	)
}

/**
 * Retrieves all Calibration Result records associated with a specific Calibration ID.
 *
 * @async
 * @param {number} calibration_id - The ID of the parent Calibration record.
 * @returns {Promise<Array<import('../repositories/calibration_result.repository.js').CalibrationResultInstance>>} An array of matching Calibration Result instances.
 * @throws {BadRequestError} If the Calibration ID is not provided.
 * @throws {NotFoundError} If no results are found.
 */
async function getAllCalibrationResultByCalibrationId(calibration_id) {
	return await existCalibrationResultByCalibrationId(calibration_id)
}

/**
 * Retrieves a single Calibration Result record by its ID.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<import('../repositories/calibration_result.repository.js').CalibrationResultInstance>} The found Calibration Result instance.
 * @throws {NotFoundError} If the record does not exist.
 */
async function getCalibrationResult(id) {
	return await existCalibrationResultById(id)
}

/**
 * Updates only the `status_result` flag of a Calibration Result record.
 * Used for manual status overrides or external status updates.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {string} status_result - The new status value (e.g., 'APROVADO', 'REPROVADO').
 * @returns {Promise<import('../repositories/calibration_result.repository.js').CalibrationResultInstance>} The updated Calibration Result instance.
 * @throws {NotFoundError} If the record does not exist.
 * @throws {BadRequestError} If the new status is not provided.
 */
async function updateCalibrationResultStatus(id, status_result) {
	await existCalibrationResultById(id)

	if (!status_result) {
		throw new BadRequestError(
			i18n.__(
				'VALIDATION.SERVICES.CALIBRATION_RESULT.CALIBRATION_RESULT_STATUS_NOT_PROVIDE'
			)
		)
	}

	return await CalibrationResultRepository.updateCalibrationResultStatus(
		id,
		status_result
	)
}

/**
 * Deletes a Calibration Result record by ID.
 * Implements a cascading business rule: if the deleted result was the last one associated
 * with a parent Calibration record, the parent Calibration record is also deleted.
 *
 * @async
 * @param {number} id - The ID of the Calibration Result record to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the record was successfully deleted.
 * @throws {NotFoundError} If the record does not exist.
 */
async function deleteCalibrationResult(id) {
	const resultToDelete = await existCalibrationResultById(id)
	const calibrationId = resultToDelete.calibration_id

	const isDeleted = await CalibrationResultRepository.deleteCalibrationResult({
		id,
	})

	if (isDeleted) {
		/**@description -> Verify if is the last result */
		const remainingResults =
			await CalibrationResultRepository.getAllCalibrationResultByCalibrationId(
				calibrationId
			)

		if (remainingResults.length === 0) {
			/**@description -> Call the function to delete the calibration */
			await CalibrationRepository.deleteCalibration({ id: calibrationId })
		}
	}
	return isDeleted
}

/**
 * @module CalibrationResultService
 * @description Service layer for managing Calibration Result records. It enforces business rules,
 * performs technical calculations (e.g., optimal resolution, final status), and manages
 * cascading deletion logic to maintain data integrity.
 */
export default {
	createCalibrationResult,
	updateCalibrationResult,
	getAllCalibrationResultByCalibrationId,
	getCalibrationResult,
	updateCalibrationResultStatus,
	deleteCalibrationResult,
}
