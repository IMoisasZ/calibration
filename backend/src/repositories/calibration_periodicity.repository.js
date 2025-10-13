/** @format */

import { CalibrationPeriodicityModel } from '../models/__index.js'

/**
 * @typedef {import('sequelize').Model} Model
 * @typedef {object} CalibrationPeriodicityData
 * @property {string} description The descriptive name of the periodicity (e.g., 'ANNUAL').
 * @property {number} calibration_days The number of days for this periodicity (e.g., 365).
 * @property {boolean} [active=true] Status indicating if the periodicity is active.
 */

/**
 * Creates a new Calibration Periodicity record.
 * It fetches and returns the full record after creation to include all database-generated fields.
 *
 * @async
 * @param {CalibrationPeriodicityData} calibrationPeriodicity - The data payload for the new periodicity.
 * @returns {Promise<Model>} A promise that resolves to the created CalibrationPeriodicity instance.
 */
async function createCalibrationPeriodicity(calibrationPeriodicity) {
	const { id } = await CalibrationPeriodicityModel.create(
		calibrationPeriodicity
	)
	return await getCalibrationPeriodicity(id)
}

/**
 * Updates an existing Calibration Periodicity record by fetching the instance,
 * modifying its properties, and saving the changes.
 *
 * @async
 * @param {number} id - The ID of the periodicity record to update.
 * @param {CalibrationPeriodicityData} calibrationPeriodicity - The updated data payload.
 * @returns {Promise<Model>} A promise that resolves to the updated CalibrationPeriodicity instance.
 */
async function updateCalibrationPeriodicity(id, calibrationPeriodicity) {
	const instanceCalibrationPeriodicity = await getCalibrationPeriodicity(id)

	Object.assign(instanceCalibrationPeriodicity, calibrationPeriodicity)

	await instanceCalibrationPeriodicity.save()

	return await getCalibrationPeriodicity(id)
}

/**
 * Retrieves all Calibration Periodicity records based on an optional WHERE clause.
 *
 * @async
 * @param {object} [whereClause={}] - Optional Sequelize `where` clause for filtering.
 * @returns {Promise<Array<Model>>} A promise that resolves to an array of CalibrationPeriodicity instances.
 */
async function getAllCalibrationPeriodicity(whereClause) {
	return await CalibrationPeriodicityModel.findAll({
		where: whereClause,
	})
}

/**
 * Finds a single Calibration Periodicity record by its primary key (ID).
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<Model|null>} A promise that resolves to a CalibrationPeriodicity instance or null if not found.
 */
async function getCalibrationPeriodicity(id) {
	return await CalibrationPeriodicityModel.findByPk(id)
}

/**
 * Updates only the 'active' status of a Calibration Periodicity record using a direct Model.update query.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<Model>} A promise that resolves to the updated CalibrationPeriodicity instance.
 */
async function updateCalibrationPeriodicityStatus(id, active) {
	await CalibrationPeriodicityModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getCalibrationPeriodicity(id)
}

/**
 * @module CalibrationPeriodicityRepository
 * @description Repository for handling all CRUD and status operations on the CalibrationPeriodicity model.
 */
export default {
	createCalibrationPeriodicity,
	updateCalibrationPeriodicity,
	getAllCalibrationPeriodicity,
	getCalibrationPeriodicity,
	updateCalibrationPeriodicityStatus,
}
