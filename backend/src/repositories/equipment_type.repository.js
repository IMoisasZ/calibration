/** @format */

import { log } from 'console'
import { EquipmentTypeModel } from '../models/__index.js'

/**
 * @typedef {import('sequelize').Model} EquipmentTypeInstance
 * @typedef {object} EquipmentTypeData
 * @property {string} equipment_type - The name or description of the equipment type (e.g., 'MANOMETER', 'SCALE'). Must be unique.
 * @property {boolean} [active=true] - Status indicating if the equipment type is currently active and available for use.
 */

/**
 * Creates a new Equipment Type record.
 *
 * @async
 * @param {EquipmentTypeData} equipmentType - The data payload for the new equipment type.
 * @returns {Promise<EquipmentTypeInstance>} A promise that resolves to the newly created EquipmentType instance.
 */
async function createEquipmentType(equipmentType) {
	return await EquipmentTypeModel.create(equipmentType)
}

/**
 * Updates an existing Equipment Type record by ID.
 * Uses a direct update query and then fetches the updated instance.
 *
 * @async
 * @param {number} id - The ID of the Equipment Type record to update.
 * @param {EquipmentTypeData} equipmentType - The updated data payload.
 * @returns {Promise<EquipmentTypeInstance>} A promise that resolves to the updated EquipmentType instance.
 */
async function updateEquipmentType(id, equipmentType) {
	await EquipmentTypeModel.update(equipmentType, {
		where: {
			id,
		},
	})
	return await getEquipmentType(id)
}

/**
 * Retrieves all Equipment Type records based on an optional WHERE clause.
 *
 * @async
 * @param {object} [whereClause={}] - Optional Sequelize `where` clause for filtering.
 * @returns {Promise<Array<EquipmentTypeInstance>>} A promise that resolves to an array of EquipmentType instances.
 */
async function getAllEquipmentType(whereClause) {
	return await EquipmentTypeModel.findAll({
		where: whereClause,
	})
}

/**
 * Finds a single Equipment Type record by its primary key (ID).
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<EquipmentTypeInstance|null>} A promise that resolves to an EquipmentType instance or null if not found.
 */
async function getEquipmentType(id) {
	return await EquipmentTypeModel.findByPk(id)
}

/**
 * Updates only the 'active' status of an Equipment Type record using a direct Model.update query.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<EquipmentTypeInstance>} A promise that resolves to the updated EquipmentType instance.
 */
async function updateEquipmentTypeStatus(id, active) {
	await EquipmentTypeModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getEquipmentType(id)
}

/**
 * @module EquipmentTypeRepository
 * @description Repository for handling all CRUD and status operations on the EquipmentType model.
 */
export default {
	createEquipmentType,
	updateEquipmentType,
	getAllEquipmentType,
	getEquipmentType,
	updateEquipmentTypeStatus,
}
