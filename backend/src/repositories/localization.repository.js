/** @format */

import { LocalizationModel } from '../models/__index.js'

/**
 * @typedef {import('sequelize').Model} LocalizationInstance
 * @typedef {object} LocalizationData
 * @property {string} description - The descriptive name of the location (e.g., 'BUILDING A', 'LAB 3'). Must be unique.
 * @property {boolean} [active=true] - Status indicating if the localization is currently active and available for use.
 */

/**
 * Creates a new Localization record in the database.
 *
 * @async
 * @param {LocalizationData} localization - The data payload for the new location.
 * @returns {Promise<LocalizationInstance>} A promise that resolves to the newly created Localization instance.
 */
async function createLocalization(localization) {
	const newLocalization = await LocalizationModel.create(localization)
	return await newLocalization
}

/**
 * Updates an existing Localization record by ID.
 * Uses a direct update query and then fetches the updated instance to return complete data.
 *
 * @async
 * @param {number} id - The ID of the Localization record to update.
 * @param {LocalizationData} localization - The updated data payload.
 * @returns {Promise<LocalizationInstance>} A promise that resolves to the updated Localization instance.
 */
async function updateLocalization(id, localization) {
	await LocalizationModel.update(localization, {
		where: {
			id,
		},
	})
	return await getLocalization(id)
}

/**
 * Retrieves all Localization records based on an optional WHERE clause.
 *
 * @async
 * @param {object} [whereClause={}] - Optional Sequelize `where` clause for filtering.
 * @returns {Promise<Array<LocalizationInstance>>} A promise that resolves to an array of Localization instances.
 */
async function getAllLocalization(whereClause) {
	return await LocalizationModel.findAll({
		where: whereClause,
	})
}

/**
 * Finds a single Localization record by its primary key (ID).
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<LocalizationInstance|null>} A promise that resolves to a Localization instance or null if not found.
 */
async function getLocalization(id) {
	return await LocalizationModel.findByPk(id)
}

/**
 * Updates only the 'active' status flag of a Localization record.
 * Uses a direct Model.update query for efficiency and returns the updated instance.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<LocalizationInstance>} A promise that resolves to the updated Localization instance.
 */
async function updateLocalizationStatus(id, active) {
	await LocalizationModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getLocalization(id)
}

/**
 * @module LocalizationRepository
 * @description Repository for handling all CRUD and status operations on the Localization model.
 */
export default {
	createLocalization,
	updateLocalization,
	getAllLocalization,
	getLocalization,
	updateLocalizationStatus,
}
