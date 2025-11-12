/** @format */

import LocalizationRepository from '../repositories/localization.repository.js'
import {
	BadRequestError,
	NotFoundError,
	AlreadyAdded,
} from '../errors/customErrors.error.js'
import { UniqueConstraintError } from 'sequelize'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {object} LocalizationPayload
 * @property {string} description - The name or description of the physical location (e.g., 'Warehouse A', 'Lab 3'). Must be unique.
 * @property {boolean} [active=true] - Status indicating if the localization record is currently active.
 */

/**@description -> Function to verify if exist localization */
/**
 * Internal function to validate the presence of an ID and check if a Localization record exists by its ID.
 * Throws specific, internationalized errors if the ID is missing or the record is not found.
 *
 * @async
 * @private
 * @param {number} id - The ID of the Localization record to check.
 * @returns {Promise<import('../repositories/localization.repository.js').LocalizationInstance>} A promise that resolves to the found Localization instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If no record is found with the given ID.
 */
async function verifyLocalizationExistence(id) {
	if (!id) {
		throw new BadRequestError(
			i18n.__('VALIDATION.SERVICES.LOCALIZATION_ID_NOT_PROVIDE')
		)
	}

	const localization = await LocalizationRepository.getLocalization(id)
	if (!localization) {
		throw new NotFoundError(
			'VALIDATION.SERVICES.LOCALIZATION_BY_ID_NOT_FOUND',
			id
		)
	}
	return localization
}

/**
 * Creates a new Localization record.
 * Handles Sequelize's UniqueConstraintError by throwing a custom AlreadyAdded error
 * if a localization with the same description already exists.
 *
 * @async
 * @param {LocalizationPayload} localization - The data payload for the new localization.
 * @returns {Promise<import('../repositories/localization.repository.js').LocalizationInstance>} The newly created Localization instance.
 * @throws {AlreadyAdded} If a Localization with the same unique description already exists.
 * @throws {Error} Propagates other errors.
 */
async function createLocalization(localization) {
	try {
		return await LocalizationRepository.createLocalization(localization)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.LOCALIZATION_ALREDY_ADDED',
					localization.description
				)
			)
		}
		throw error
	}
}

/**
 * Updates an existing Localization record by ID.
 * Ensures the record exists before attempting the update and handles unique constraint errors.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {LocalizationPayload} localization - The updated data payload.
 * @returns {Promise<import('../repositories/localization.repository.js').LocalizationInstance>} The updated Localization instance.
 * @throws {NotFoundError} If the record to update does not exist.
 * @throws {AlreadyAdded} If the update operation causes a unique constraint violation on the description.
 * @throws {Error} Propagates other errors.
 */
async function updateLocalization(id, localization) {
	await verifyLocalizationExistence(id)

	try {
		return await LocalizationRepository.updateLocalization(id, localization)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.LOCALIZATION_ALREDY_ADDED',
					localization.description
				)
			)
		}
		throw error
	}
}

/**
 * Retrieves a list of all Localization records.
 * Allows optional filtering to return only active records.
 *
 * @async
 * @param {string} status - If the string value is 'true', only returns records where `active: true`. Otherwise, returns all records.
 * @returns {Promise<Array<import('../repositories/localization.repository.js').LocalizationInstance>>} An array of Localization instances.
 */
async function getAllLocalization(status) {
	if (status === 'true') {
		return await LocalizationRepository.getAllLocalization({ active: true })
	}
	return await LocalizationRepository.getAllLocalization({})
}

/**
 * Finds a single Localization record by its primary key (ID).
 * Leverages `verifyLocalizationExistence` to ensure the record is found or an error is thrown.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<import('../repositories/localization.repository.js').LocalizationInstance>} The found Localization instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If the record does not exist.
 */
async function getLocalization(id) {
	const localization = await verifyLocalizationExistence(id)

	return localization
}

/**
 * Updates only the 'active' status flag of a Localization record.
 * Ensures the record exists before attempting the status update and validates the status parameter.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<import('../repositories/localization.repository.js').LocalizationInstance>} The updated Localization instance.
 * @throws {NotFoundError} If the record does not exist.
 * @throws {BadRequestError} If the 'active' status value is not provided.
 */
async function updateLocalizationStatus(id, active) {
	await verifyLocalizationExistence(id)
	if (active === undefined) {
		throw new BadRequestError(
			i18n.__('VALIDATION.SERVICES.LOCALIZATION_ACTIVE_NOT_PROVIDE')
		)
	}
	return await LocalizationRepository.updateLocalizationStatus(id, active)
}

/**
 * @module LocalizationService
 * @description Service layer for managing Localization records (physical locations). It handles
 * existence validation, unique constraint enforcement, and status toggling for location data.
 */
export default {
	createLocalization,
	updateLocalization,
	getAllLocalization,
	getLocalization,
	updateLocalizationStatus,
}
