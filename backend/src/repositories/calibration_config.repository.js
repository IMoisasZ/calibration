/** @format */

import dbConnection from '../connection/db.connection.js'
import { CalibrationConfigModel } from '../models/__index.js'

/**
 * @typedef {import('sequelize').Model} CalibrationConfigInstance
 * @typedef {object} CalibrationConfigData
 * @property {number} factor The numeric calibration factor to be used.
 * @property {boolean} [actual] Flag indicating if this is the active factor.
 */

/**
 * Creates a new Calibration Config record.
 * This function is used independently or as part of a transaction (via the options parameter).
 *
 * @async
 * @param {CalibrationConfigData} calibrationConfig - The data payload for the new configuration.
 * @param {object} [options={}] - Sequelize options object, typically including a transaction object.
 * @returns {Promise<CalibrationConfigInstance>} The newly created CalibrationConfig instance.
 */
async function createCalibrationConfig(calibrationConfig, options = {}) {
	return await CalibrationConfigModel.create(calibrationConfig, options)
}

/**
 * Executes a critical operation to transition the active calibration factor.
 * It atomically updates all current 'actual' factors to false, and then creates the new configuration.
 * The operation is wrapped in a transaction to ensure only one factor is active at a time.
 *
 * @async
 * @param {CalibrationConfigData} calibrationConfig - The data payload for the new active configuration.
 * @returns {Promise<CalibrationConfigInstance>} The newly created and active CalibrationConfig instance.
 * @throws {Error} Throws an error if the transaction fails, automatically rolling back changes.
 */
async function updateCalibrationConfigToNoActualAndCreate(calibrationConfig) {
	const t = await dbConnection.transaction()

	try {
		await CalibrationConfigModel.update(
			{ actual: false },
			{
				where: {
					actual: true,
				},
				transaction: t,
			}
		)
		const newCalibrationConfig = await createCalibrationConfig(
			calibrationConfig,
			{ transaction: t }
		)
		await t.commit()
		return newCalibrationConfig
	} catch (error) {
		t.rollback()
		throw error
	}
}

/**
 * Retrieves the most recent Calibration Config records.
 * Limits the results to the top 5, ordered by creation date (descending).
 *
 * @async
 * @param {object} [whereClause={}] - Optional Sequelize `where` clause for filtering.
 * @returns {Promise<Array<CalibrationConfigInstance>>} An array of CalibrationConfig instances.
 */
async function getAllCalibrationConfig(whereClause) {
	return await CalibrationConfigModel.findAll({
		where: whereClause,
		order: [['createdAt', 'DESC']],
		limit: 5,
	})
}

/**
 * Finds a single Calibration Config record by its primary key (ID).
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<CalibrationConfigInstance|null>} The CalibrationConfig instance or null if not found.
 */
async function getCalibrationConfig(id) {
	return await CalibrationConfigModel.findByPk(id)
}

/**
 * @module CalibrationConfigRepository
 * @description Repository for managing the creation, update, and retrieval of calibration configuration factors.
 */
export default {
	updateCalibrationConfigToNoActualAndCreate,
	getAllCalibrationConfig,
	getCalibrationConfig,
}
