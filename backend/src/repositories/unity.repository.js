/** @format */

import { UnityModel } from '../models/__index.js'

/**
 * @typedef {import('sequelize').Model} UnityInstance
 * @typedef {object} UnityData
 * @property {string} description - The full name description of the unit of measurement (e.g., 'KILOGRAM'). Must be unique.
 * @property {string} tag - The short tag or symbol for the unit (e.g., 'KG'). Must be unique.
 * @property {boolean} [active=true] - Flag indicating if the unit of measurement is currently active.
 */

/**
 * Creates a new Unity (Unit of Measurement) record in the database.
 *
 * @async
 * @param {UnityData} unity - The data payload for the new unit.
 * @returns {Promise<UnityInstance>} A promise that resolves to the newly created Unity instance.
 */
async function createUnity(unity) {
	return await UnityModel.create(unity)
}

/**
 * Updates an existing Unity record by ID using the fetch-update-save pattern.
 * Manually assigns fields to the instance before calling save().
 *
 * @async
 * @param {number} id - The ID of the Unity record to update.
 * @param {UnityData} unity - The updated data payload.
 * @returns {Promise<UnityInstance>} A promise that resolves to the updated Unity instance.
 */
async function updateUnity(id, unity) {
	const unityInstance = await getUnity(id)

	Object.assign(unityInstance, unity)

	return await unityInstance.save()
}

/**
 * Retrieves all Unity records based on an optional WHERE clause.
 *
 * @async
 * @param {object} [whereClause={}] - Optional Sequelize `where` clause for filtering.
 * @returns {Promise<Array<UnityInstance>>} A promise that resolves to an array of Unity instances.
 */
async function getAllUnity(whereClause) {
	return await UnityModel.findAll({
		where: whereClause,
	})
}

/**
 * Finds a single Unity record by its primary key (ID).
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<UnityInstance|null>} A promise that resolves to a Unity instance or null if not found.
 */
async function getUnity(id) {
	return await UnityModel.findByPk(id)
}

/**
 * Updates only the 'active' status flag of a Unity record.
 * Uses a direct Model.update query for efficiency and returns the updated instance.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<UnityInstance>} A promise that resolves to the updated Unity instance.
 */
async function updateUnityStatus(id, active) {
	await UnityModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getUnity(id)
}

/**
 * @module UnityRepository
 * @description Repository for handling all CRUD and status operations on the Unity (Unit of Measurement) model.
 */
export default {
	createUnity,
	updateUnity,
	getAllUnity,
	getUnity,
	updateUnityStatus,
}
