/** @format */

import UnityRepository from '../repositories/unity.repository.js'
import {
	BadRequestError,
	NotFoundError,
	AlreadyAdded,
} from '../errors/customErrors.error.js'
import { UniqueConstraintError } from 'sequelize'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {object} UnityPayload
 * @property {string} description - The full name description of the unit of measurement (e.g., 'KILOGRAM'). Must be unique.
 * @property {string} tag - The short tag or symbol for the unit (e.g., 'KG'). Must be unique.
 * @property {boolean} [active=true] - Status indicating if the unit of measurement is currently active.
 */

/**
 * Internal function to check if a Unity record exists by its ID.
 * Throws an error if the ID is missing.
 *
 * NOTE: The original code has an implementation error where the NotFoundError is calculated but not thrown.
 *
 * @async
 * @private
 * @param {number} id - The primary key ID of the Unity record to check.
 * @returns {Promise<import('../repositories/unity.repository.js').UnityInstance>} A promise that resolves to the found Unity instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If no unit record is found with the given ID (Assuming the implementation error is corrected).
 */
async function existUnityById(id) {
	if (!id) {
		throw new BadRequestError(
			i18n.__('VALIDATION.SERVICES.UNITY.UNITY_ID_NOT_PROVIDE')
		)
	}

	const unity = await UnityRepository.getUnity(id)

	if (!unity) {
		throw new NotFoundError(
			i18n.__('VALIDATION.SERVICES.UNITY.UNITY_BY_ID_NOT_FOUND', id)
		)
	}

	return unity
}

/**
 * Creates a new Unity (Unit of Measurement) record.
 * Handles Sequelize's UniqueConstraintError, translating it into a custom UnityAlreadyAdded error,
 * to enforce the uniqueness of both description and tag fields.
 *
 * @async
 * @param {UnityPayload} unity - The data payload for the new unit.
 * @returns {Promise<import('../repositories/unity.repository.js').UnityInstance>} The newly created Unity instance.
 * @throws {AlreadyAdded} If a Unit with the same description or tag already exists.
 * @throws {Error} Propagates other errors.
 */
async function createUnity(unity) {
	try {
		return await UnityRepository.createUnity(unity)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.UNITY.UNITY_ALREADY_ADDED',
					unity.description,
					unity.tag
				)
			)
		}
		throw error
	}
}

/**
 * Updates an existing Unity record by ID.
 * Ensures the record exists before update and handles unique constraint errors if the description or tag is changed to a duplicate.
 *
 * NOTE: The original code has an implementation error where the catch block does not re-throw non-unique constraint errors.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {UnityPayload} unity - The updated data payload.
 * @returns {Promise<import('../repositories/unity.repository.js').UnityInstance>} The updated Unity instance.
 * @throws {NotFoundError} If the record to update does not exist (assuming `existUnityById` works correctly).
 * @throws {AlreadyAdded} If the update causes a unique constraint violation on description or tag.
 * @throws {Error} Propagates other errors (assuming the implementation error in the catch block is corrected).
 */
async function updateUnity(id, unity) {
	await existUnityById(id)
	try {
		return await UnityRepository.updateUnity(id, unity)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.UNITY.UNITY_ALREADY_ADDED',
					unity.description,
					unity.tag
				)
			)
		}
		throw error
	}
}

/**
 * Retrieves a list of all Unity records.
 * Allows optional filtering to return only active units.
 *
 * @async
 * @param {string} status - If the string value is 'true', only returns records where `active: true`. Otherwise, returns all records.
 * @returns {Promise<Array<import('../repositories/unity.repository.js').UnityInstance>>} An array of Unity instances.
 */
async function getAllUnity(status) {
	if (status === 'true') {
		return await UnityRepository.getAllUnity({ active: true })
	}
	return await UnityRepository.getAllUnity({})
}

/**
 * Finds a single Unity record by its primary key (ID).
 * Leverages `existUnityById` for validation and existence check.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<import('../repositories/unity.repository.js').UnityInstance>} The found Unity instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If the record does not exist (Assuming `existUnityById` works correctly).
 */
async function getUnity(id) {
	return await existUnityById(id)
}

/**
 * Updates only the 'active' status flag of a Unity record.
 * Ensures the record exists before attempting the status update.
 *
 * @async
 * @param {number} id - The ID of the unit to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<import('../repositories/unity.repository.js').UnityInstance>} The updated Unity instance.
 * @throws {NotFoundError} If the record does not exist (Assuming `existUnityById` works correctly).
 */
async function updateUnityStatus(id, active) {
	await existUnityById(id)

	return await UnityRepository.updateUnityStatus(id, active)
}

/**
 * @module UnityService
 * @description Service layer for managing Unity records (Units of Measurement). It handles
 * existence validation and unique constraint enforcement for unit data.
 */
export default {
	createUnity,
	updateUnity,
	getAllUnity,
	getUnity,
	updateUnityStatus,
}
