/** @format */

import OwnerRepository from '../repositories/owner.repository.js'
import { BadRequestError, NotFoundError } from '../errors/customErrors.error.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {object} OwnerPayload
 * @property {string} owner - The name of the owner or responsible department (e.g., 'Engineering', 'Production').
 * @property {number} localization_id - The ID of the Localization record where this owner is based.
 * @property {boolean} [active=true] - Status indicating if the owner record is active.
 */

/**
 * Internal function to check if an Owner record exists by its ID.
 * Throws specific, internationalized errors if the ID is missing or the record is not found.
 *
 * @async
 * @private
 * @param {number} id - The ID of the Owner record to check.
 * @returns {Promise<import('../repositories/owner.repository.js').OwnerInstance>} A promise that resolves to the found Owner instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If no record is found with the given ID.
 */
async function existOwnerById(id) {
	if (!id) {
		throw new BadRequestError(
			i18n.__('VALIDATION.SERVICES.OWNER.OWNER_ID_NOT_PROVIDE')
		)
	}

	const owner = await OwnerRepository.getOwner(id)
	if (!owner) {
		throw new NotFoundError(
			i18n.__('VALIDATION.SERVICES.OWNER.OWNER_BY_ID_NOT_FOUND', id)
		)
	}
	return owner
}

/**
 * Internal function to verify the uniqueness of the combination of owner name and localization ID.
 * This enforces a business rule that an owner name must be unique within a specific location.
 *
 * NOTE: When called by `updateOwner`, an extra `id` parameter is passed in the original code,
 * which is expected to be handled by the Repository to exclude the current record from the uniqueness check.
 *
 * @async
 * @private
 * @param {string} ownerName - The name of the owner to check.
 * @param {number} localization_id - The foreign key ID of the localization.
 * @param {number} [currentId] - Optional ID of the owner being updated (used to exclude the current record from the check).
 * @returns {Promise<boolean>} A promise that resolves to true if the combination is unique (i.e., does not exist).
 * @throws {BadRequestError} If either owner name or localization ID is missing.
 * @throws {BadRequestError} If the combination of owner name and localization ID already exists.
 */
async function existOwnerAndLocalization(ownerName, localization_id) {
	if (!ownerName || !localization_id) {
		throw new BadRequestError(
			i18n.__(
				'VALIDATION.SERVICES.OWNER.OWNER_AND_LOCALIZATION_SHOULD_BE_PROVIDE'
			)
		)
	}

	const data = await OwnerRepository.getExistOwnerAndLocalization(
		ownerName,
		localization_id
	)

	if (data && data.length > 0) {
		throw new BadRequestError(
			i18n.__(
				'VALIDATION.SERVICES.OWNER.OWNER_AND_LOCALIZATION_HAS_BEEN_ADDED',
				ownerName,
				localization_id
			)
		)
	}
	return true
}

/**
 * Creates a new Owner record, enforcing the unique combination constraint for owner name and localization ID.
 *
 * @async
 * @param {OwnerPayload} owner - The data payload for the new owner.
 * @returns {Promise<import('../repositories/owner.repository.js').OwnerInstance>} The newly created Owner instance.
 * @throws {BadRequestError} If the owner name or localization ID is missing in the payload.
 * @throws {BadRequestError} If the combination of owner name and localization ID already exists.
 */
async function createOwner(owner) {
	await existOwnerAndLocalization(owner.owner, owner.localization_id)
	return await OwnerRepository.createOwner(owner)
}

/**
 * Updates an existing Owner record by ID.
 * Ensures the record exists and that the updated owner name/localization combination remains unique.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {OwnerPayload} owner - The updated data payload.
 * @returns {Promise<import('../repositories/owner.repository.js').OwnerInstance>} The updated Owner instance.
 * @throws {BadRequestError} If payload data is missing or if the updated combination already exists.
 * @throws {NotFoundError} If the record to update does not exist.
 */
async function updateOwner(id, owner) {
	await existOwnerById(id)

	await existOwnerAndLocalization(owner.owner, owner.localization_id)

	return await OwnerRepository.updateOwner(id, owner)
}

/**
 * Retrieves a list of all Owner records.
 * Allows optional filtering to return only active records.
 *
 * @async
 * @param {string} status - If the string value is 'true', only returns records where `active: true`. Otherwise, returns all records.
 * @returns {Promise<Array<import('../repositories/owner.repository.js').OwnerInstance>>} An array of Owner instances.
 */
async function getAllOwner(status) {
	if (status === 'true') {
		return await OwnerRepository.getAllOwner({ active: true })
	}
	return await OwnerRepository.getAllOwner({})
}

/**
 * Finds a single Owner record by its primary key (ID).
 * Leverages `existOwnerById` to ensure the record is found or an error is thrown.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<import('../repositories/owner.repository.js').OwnerInstance>} The found Owner instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If the record does not exist.
 */
async function getOwner(id) {
	return await existOwnerById(id)
}

/**
 * Updates only the 'active' status flag of an Owner record.
 * Ensures the record exists before attempting the status update.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<import('../repositories/owner.repository.js').OwnerInstance>} The updated Owner instance.
 * @throws {NotFoundError} If the record does not exist.
 */
async function updateOwnerStatus(id, active) {
	await existOwnerById(id)

	return await OwnerRepository.updateOwnerStatus(id, active)
}

/**
 * @module OwnerService
 * @description Service layer for managing Owner records (responsible parties/departments). It provides
 * existence validation and enforces the unique business rule for the combination of owner name and localization.
 */
export default {
	createOwner,
	updateOwner,
	getAllOwner,
	getOwner,
	updateOwnerStatus,
}
