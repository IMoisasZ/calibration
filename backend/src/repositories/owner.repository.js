/** @format */

import { OwnerModel, LocalizationModel } from '../models/__index.js'
import { Op } from 'sequelize'

/**
 * @typedef {import('sequelize').Model} OwnerInstance
 * @typedef {object} OwnerData
 * @property {string} owner - The name of the owner or responsible department.
 * @property {number} localization_id - Foreign key linking to the location of the owner.
 * @property {boolean} [active=true] - Status indicating if the owner record is currently active.
 */

/**
 * Creates a new Owner record and retrieves the complete instance with associations.
 *
 * @async
 * @param {OwnerData} owner - The data payload for the new owner record.
 * @returns {Promise<OwnerInstance>} The newly created Owner instance, including its Localization.
 */
async function createOwner(owner) {
	const { id } = await OwnerModel.create(owner)
	return await getOwner(id)
}

/**
 * Updates an existing Owner record using the fetch-update-save pattern with Object.assign.
 *
 * @async
 * @param {number} id - The ID of the Owner record to update.
 * @param {OwnerData} owner - The updated data payload.
 * @returns {Promise<OwnerInstance>} The updated Owner instance, including its Localization.
 */
async function updateOwner(id, owner) {
	const instanceOwner = await getOwner(id)

	Object.assign(instanceOwner, owner)

	await instanceOwner.save()

	return instanceOwner
}

/**
 * Retrieves all Owner records, including their associated Localization model (Eager Loading).
 *
 * @async
 * @param {object} [whereClause={}] - Optional Sequelize `where` clause for filtering.
 * @returns {Promise<Array<OwnerInstance>>} An array of Owner instances with Localization data.
 */
async function getAllOwner(whereClause) {
	return await OwnerModel.findAll({
		where: whereClause,
		include: {
			model: LocalizationModel,
		},
	})
}

/**
 * Finds a single Owner record by its primary key (ID), including its associated Localization model.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<OwnerInstance|null>} The Owner instance or null if not found, including Localization data.
 */
async function getOwner(id) {
	return await OwnerModel.findByPk(id, {
		include: {
			model: LocalizationModel,
		},
	})
}

/**
 * Updates only the 'active' status flag of an Owner record.
 * Uses a direct Model.update query for efficiency and returns the updated instance.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<OwnerInstance>} The updated Owner instance, including its Localization.
 */
async function updateOwnerStatus(id, active) {
	await OwnerModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getOwner(id)
}

/**
 * Checks for the existence of an owner with the same name and localization ID, excluding a specific ID.
 * This is typically used for enforcing a unique constraint combination during updates/creation.
 *
 * @async
 * @param {string} owner - The name of the owner/department to check.
 * @param {number} localization_id - The foreign key ID of the localization to check.
 * @param {number} id - The ID of the current record being edited (to exclude from the check).
 * @returns {Promise<Array<OwnerInstance>>} An array of existing matching Owner records. An empty array indicates the combination is unique.
 */
async function getExistOwnerAndLocalization(owner, localization_id, id) {
	return await OwnerModel.findAll({
		where: {
			[Op.and]: [{ owner }, { localization_id }, { id: { [Op.ne]: id } }],
		},
	})
}

/**
 * @module OwnerRepository
 * @description Repository for handling all CRUD, status, and validation operations on the Owner model, including Localization associations.
 */
export default {
	createOwner,
	updateOwner,
	getAllOwner,
	getOwner,
	updateOwnerStatus,
	getExistOwnerAndLocalization,
}
