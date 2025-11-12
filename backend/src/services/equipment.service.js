/** @format */

import EquipmentRepository from '../repositories/equipment.repository.js'
import { UniqueConstraintError } from 'sequelize'
import {
	BadRequestError,
	NotFoundError,
	AlreadyAdded,
} from '../errors/customErrors.error.js'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {object} EquipmentPayload
 * @property {string} identifier - The unique alphanumeric identifier for the equipment (e.g., 'EQP-1001').
 * @property {string} description - A detailed description of the equipment.
 * @property {string} brand - The equipment manufacturer's brand.
 * @property {string} model - The specific model name or number.
 * @property {string} serial_number - The manufacturer's unique serial number.
 * @property {number} equipment_type_id - Foreign key to the EquipmentType model.
 * @property {number} unity_id - Foreign key to the Unity (unit of measurement) model.
 * @property {number} owner_id - Foreign key to the Owner (responsible department/person) model.
 * @property {number} localization_id - Foreign key to the Localization (physical location) model.
 * @property {number} acceptance_criteria - The technical acceptance limit for calibration results.
 * @property {number} calibration_periodicity_id - Foreign key to the CalibrationPeriodicity model.
 * @property {boolean} [active=true] - Status indicating if the equipment is currently active and in use.
 */

/**
 * Internal function to check if an Equipment record exists by its primary key (ID).
 * Throws specific, internationalized errors if the ID is missing or the record is not found.
 *
 * @async
 * @private
 * @param {number} id - The primary key ID of the Equipment record to check.
 * @returns {Promise<import('../repositories/equipment.repository.js').EquipmentInstance>} A promise that resolves to the found Equipment instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If no equipment record is found with the given ID.
 */
async function existEquipmentId(id) {
	if (!id) {
		throw new BadRequestError(
			i18n.__('VALIDATION.SERVICES.EQUIPMENT_ID_NOT_PROVIDE')
		)
	}

	const equipment = await EquipmentRepository.getEquipment(id)
	if (!equipment) {
		throw new NotFoundError(
			i18n.__('VALIDATION.SERVICES.EQUIPMENT_BY_ID_NOT_FOUND', id)
		)
	}

	return equipment
}

/**
 * Creates a new Equipment record.
 * Handles Sequelize's UniqueConstraintError, translating it into a custom AlreadyAdded error,
 * primarily to enforce the uniqueness of the equipment's identifier.
 *
 * @async
 * @param {EquipmentPayload} equipment - The data payload for the new equipment.
 * @returns {Promise<import('../repositories/equipment.repository.js').EquipmentInstance>} The newly created Equipment instance.
 * @throws {AlreadyAdded} If an Equipment with the same unique identifier already exists.
 * @throws {Error} Propagates other errors.
 */
async function createEquipment(equipment) {
	try {
		return await EquipmentRepository.createEquipment(equipment)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.EQUIPMENT_ALRED_ADDED',
					equipment.identifier
				)
			)
		}
		throw error
	}
}

/**
 * Updates an existing Equipment record by ID.
 * Ensures the record exists before update and handles unique constraint errors if the identifier is changed to a duplicate.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {EquipmentPayload} equipment - The updated data payload.
 * @returns {Promise<import('../repositories/equipment.repository.js').EquipmentInstance>} The updated Equipment instance.
 * @throws {NotFoundError} If the record to update does not exist.
 * @throws {AlreadyAdded} If the update causes a unique constraint violation on the identifier.
 * @throws {Error} Propagates other errors.
 */
async function updateEquipment(id, equipment) {
	await existEquipmentId(id)
	try {
		return await EquipmentRepository.updateEquipment(id, equipment)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.EQUIPMENT_ALREDY_ADDED',
					equipment.identifier
				)
			)
		}
		throw error
	}
}

/**
 * Retrieves a list of all Equipment records.
 * Allows optional filtering to return only active equipment.
 *
 * @async
 * @param {string} status - If the string value is not 'true', returns all records. If 'true', only returns records where `active: true`.
 * @returns {Promise<Array<import('../repositories/equipment.repository.js').EquipmentInstance>>} An array of Equipment instances.
 */
async function getAllEquipment(status) {
	if (status !== 'true') {
		return await EquipmentRepository.getAllEquipment({})
	}
	return await EquipmentRepository.getAllEquipment({ active: true })
}

/**
 * Finds a single Equipment record by its primary key (ID).
 * Leverages `existEquipmentId` to ensure the record is found or an error is thrown.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<import('../repositories/equipment.repository.js').EquipmentInstance>} The found Equipment instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If the record does not exist.
 */
async function getEquipment(id) {
	return await existEquipmentId(id)
}

/**
 * Finds a single Equipment record by its unique identifier (e.g., asset tag or ID number).
 *
 * @async
 * @param {string} identifier - The unique identifier string of the equipment.
 * @returns {Promise<import('../repositories/equipment.repository.js').EquipmentInstance>} The found Equipment instance.
 * @throws {BadRequestError} If the identifier is not provided.
 * @throws {NotFoundError} If no equipment record is found with the given identifier.
 */
async function getEquipmentByIdentifier(identifier) {
	if (!identifier) {
		throw new BadRequestError(
			i18n.__('VALIDATION.SERVICES.EQUIPMENT_IDENTIFIER_NOT_PROVIDE')
		)
	}

	const equipmentIdentifier =
		await EquipmentRepository.getEquipmentByIdentifier(identifier)

	if (!equipmentIdentifier) {
		throw new NotFoundError(
			i18n.__(
				'VALIDATION.SERVICES.EQUIPMENT_NOT_FOUND_BY_IDENTIFIER',
				identifier
			)
		)
	}

	return equipmentIdentifier
}

/**
 * Updates only the 'active' status flag of an Equipment record.
 * Ensures the record exists before attempting the status update.
 *
 * @async
 * @param {number} id - The ID of the equipment to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<import('../repositories/equipment.repository.js').EquipmentInstance>} The updated Equipment instance.
 * @throws {NotFoundError} If the record does not exist.
 */
async function updateEquipmentStatus(id, active) {
	await existEquipmentId(id)

	return await EquipmentRepository.updateEquipmentStatus(id, active)
}

/**
 * @module EquipmentService
 * @description Service layer for managing Equipment records. It provides CRUD operations,
 * ensures identifier uniqueness, validates record existence for updates and lookups,
 * and manages the equipment's active status.
 */
export default {
	createEquipment,
	updateEquipment,
	getAllEquipment,
	getEquipment,
	getEquipmentByIdentifier,
	updateEquipmentStatus,
}
