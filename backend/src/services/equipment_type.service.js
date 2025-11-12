/** @format */

import EquipmentTypeRepository from '../repositories/equipment_type.repository.js'
import {
	NotFoundError,
	BadRequestError,
	AlreadyAdded,
} from '../errors/customErrors.error.js'
import { UniqueConstraintError } from 'sequelize'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {object} EquipmentTypePayload
 * @property {string} equipment_type - The descriptive name of the equipment type (e.g., 'MANOMETER', 'SCALE'). Must be unique.
 * @property {boolean} [active=true] - Status indicating if the equipment type is active.
 */

/**
 * Internal function to validate the presence of an ID and check if an Equipment Type record exists by its ID.
 * Throws specific, internationalized errors if the ID is missing or the record is not found.
 *
 * @async
 * @private
 * @param {number} id - The ID of the Equipment Type record to check.
 * @returns {Promise<import('../repositories/equipment_type.repository.js').EquipmentTypeInstance>} A promise that resolves to the found Equipment Type instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If no record is found with the given ID.
 */
async function existEquipmentTypeId(id) {
	if (!id) {
		throw new BadRequestError(
			i18n.__('VALIDATION.SERVICES.EQUIPMENT_TYPE_ID_NOT_PROVIDE')
		)
	}

	const equipmentType = await EquipmentTypeRepository.getEquipmentType(id)

	if (!equipmentType) {
		throw new NotFoundError(
			i18n.__('VALIDATION.SERVICES.EQUIPMENT_TYPE_NOT_FOUND_BY_ID')
		)
	}

	return equipmentType
}

/**
 * Creates a new Equipment Type record.
 * Handles Sequelize's UniqueConstraintError by throwing a custom AlreadyAdded error,
 * indicating a duplicate equipment type exists.
 *
 * @async
 * @param {EquipmentTypePayload} equipmentType - The data payload for the new equipment type.
 * @returns {Promise<import('../repositories/equipment_type.repository.js').EquipmentTypeInstance>} The newly created Equipment Type instance.
 * @throws {AlreadyAdded} If an Equipment Type with the same unique field (e.g., equipment_type name) already exists.
 * @throws {Error} Propagates other errors.
 */
async function createEquipmentType(equipmentType) {
	try {
		return await EquipmentTypeRepository.createEquipmentType(equipmentType)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.EQUIPMENT_TYPE_ALREADY_ADDED',
					equipmentType.equipment_type
				)
			)
		}
		throw error
	}
}

/**
 * Updates an existing Equipment Type record by ID.
 * Ensures the record exists before attempting the update and handles unique constraint errors.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {EquipmentTypePayload} equipmentType - The updated data payload.
 * @returns {Promise<import('../repositories/equipment_type.repository.js').EquipmentTypeInstance>} The updated Equipment Type instance.
 * @throws {NotFoundError} If the record to update does not exist.
 * @throws {AlreadyAdded} If the update operation causes a unique constraint violation.
 * @throws {Error} Propagates other errors.
 */
async function updateEquipmentType(id, equipmentType) {
	await existEquipmentTypeId(id)
	try {
		return await EquipmentTypeRepository.updateEquipmentType(id, equipmentType)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.EQUIPMENT_TYPE_ALREADY_ADDED',
					equipmentType.equipment_type
				)
			)
		}
	}
}

/**
 * Retrieves a list of all Equipment Type records.
 * Allows optional filtering to return only active records.
 *
 * @async
 * @param {string} status - If the string value is not 'true', returns all records. If 'true', only returns records where `active: true`.
 * @returns {Promise<Array<import('../repositories/equipment_type.repository.js').EquipmentTypeInstance>>} An array of Equipment Type instances.
 */
async function getAllEquipmentType(status) {
	const whereClause = {}
	if (status !== 'true') {
		return await EquipmentTypeRepository.getAllEquipmentType(whereClause)
	}
	return await EquipmentTypeRepository.getAllEquipmentType({ active: true })
}

/**
 * Finds a single Equipment Type record by its primary key (ID).
 * Leverages `existEquipmentTypeId` to ensure the record is found or an error is thrown.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<import('../repositories/equipment_type.repository.js').EquipmentTypeInstance>} The found Equipment Type instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If the record does not exist.
 */
async function getEquipmentType(id) {
	return await existEquipmentTypeId(id)
}

/**
 * Updates only the 'active' status flag of an Equipment Type record.
 * Ensures the record exists before attempting the status update.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<import('../repositories/equipment_type.repository.js').EquipmentTypeInstance>} The updated Equipment Type instance.
 * @throws {NotFoundError} If the record does not exist.
 */
async function updateEquipmentTypeStatus(id, active) {
	await existEquipmentTypeId(id)

	return await EquipmentTypeRepository.updateEquipmentTypeStatus(id, active)
}

/**
 * @module EquipmentTypeService
 * @description Service layer for managing Equipment Type records, providing existence validation,
 * status management, and unique constraint error handling.
 */
export default {
	createEquipmentType,
	updateEquipmentType,
	getAllEquipmentType,
	getEquipmentType,
	updateEquipmentTypeStatus,
}
