/** @format */

import { CalibrationResultModel } from '../models/__index.js'

/**
 * @typedef {import('sequelize').Model} CalibrationResultInstance
 * @typedef {object} CalibrationResultData
 * @property {number} calibration_id - Foreign key linking to the parent Calibration event.
 * @property {number} factor_id - Foreign key linking to the CalibrationConfig factor used.
 * @property {string} measuring_range - The measuring range used during the test (e.g., '0 - 100 BAR').
 * @property {number} optimal_resolution - The optimal resolution of the instrument.
 * @property {number} biggest_deviation - The highest deviation found.
 * @property {string} status_result - The technical status result (e.g., 'APROVADO', 'REPROVADO').
 * // ... other relevant properties
 */

/**
 * Creates a new Calibration Result record.
 * The created instance is fetched and returned to include all database-generated fields.
 *
 * @async
 * @param {CalibrationResultData} calibrationResult - The data payload for the new result.
 * @returns {Promise<CalibrationResultInstance>} The created CalibrationResult instance.
 */
async function createCalibrationResult(calibrationResult) {
	const { id } = await CalibrationResultModel.create(calibrationResult)
	return await getCalibrationResult(id)
}

/**
 * Updates an existing Calibration Result record.
 * Uses `Object.assign` to apply all payload properties to the fetched instance before saving.
 *
 * @async
 * @param {number} id - The ID of the Calibration Result record to update.
 * @param {CalibrationResultData} calibrationResult - The updated data payload.
 * @returns {Promise<CalibrationResultInstance>} The updated CalibrationResult instance.
 */
async function updateCalibrationResult(id, calibrationResult) {
	const instanceCalibrationResult = await getCalibrationResult(id)

	Object.assign(instanceCalibrationResult, calibrationResult)
	await instanceCalibrationResult.save()

	return await getCalibrationResult(id)
}

/**
 * Retrieves all Calibration Result records associated with a specific Calibration event ID.
 *
 * @async
 * @param {number} calibration_id - The ID of the parent Calibration event.
 * @returns {Promise<Array<CalibrationResultInstance>>} An array of CalibrationResult instances.
 */
async function getAllCalibrationResultByCalibrationId(calibration_id) {
	return await CalibrationResultModel.findAll({
		where: {
			calibration_id,
		},
	})
}

/**
 * Finds a single Calibration Result record by its primary key (ID).
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<CalibrationResultInstance|null>} The CalibrationResult instance or null if not found.
 */
async function getCalibrationResult(id) {
	return await CalibrationResultModel.findByPk(id)
}

/**
 * Updates only the 'status_result' field of a Calibration Result record using a direct Model.update query.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {string} status_result - The new status result value (e.g., 'APROVADO', 'REPROVADO').
 * @returns {Promise<CalibrationResultInstance>} The updated CalibrationResult instance.
 */
async function updateCalibrationResultStatus(id, status_result) {
	await CalibrationResultModel.update(
		{ status_result },
		{
			where: {
				id,
			},
		}
	)
	return await getCalibrationResult(id)
}

/**
 * Deletes one or more Calibration Result records based on the provided WHERE clause.
 *
 * @async
 * @param {object} whereClause - Sequelize `where` clause defining which records to delete.
 * @returns {Promise<boolean>} True if at least one record was deleted, false otherwise.
 */
async function deleteCalibrationResult(whereClause) {
	const deleted = await CalibrationResultModel.destroy({
		where: whereClause,
	})
	return deleted > 0
}

/**
 * @module CalibrationResultRepository
 * @description Repository for handling all CRUD and status operations on the CalibrationResult model.
 */
export default {
	createCalibrationResult,
	updateCalibrationResult,
	getAllCalibrationResultByCalibrationId,
	getCalibrationResult,
	updateCalibrationResultStatus,
	deleteCalibrationResult,
}
