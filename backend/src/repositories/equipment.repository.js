/** @format */

import {
	EquipmentModel,
	EquipmentTypeModel,
	UnityModel,
	LocalizationModel,
	OwnerModel,
	CalibrationPeriodicityModel,
} from '../models/__index.js'

/**
 * @typedef {import('sequelize').Model} EquipmentInstance
 * @typedef {object} EquipmentData
 * @property {number} equipment_type_id - Foreign key linking to the type of equipment.
 * @property {string} identifier - The unique code or tag for the equipment.
 * @property {string} description - The descriptive name of the equipment.
 * @property {number} owner_id - Foreign key linking to the owner/responsible department.
 * @property {number} division - The equipment's measurement division or resolution.
 * @property {number} division_unity_id - Foreign key linking to the unit of measurement for the division.
 * @property {number} min_capacity - The minimum measurement capacity.
 * @property {number} max_capacity - The maximum measurement capacity.
 * @property {number} acceptance_criteria - The maximum acceptable error or tolerance.
 * @property {number} capacity_unity_id - Foreign key linking to the unit of measurement for the capacity.
 * @property {number} calibration_periodicity - Foreign key linking to the calibration periodicity rule.
 * @property {boolean} [active=true] - Status indicating if the equipment is active.
 */

/**
 * Creates a new Equipment record.
 * The created instance is fetched and returned with all associations included.
 *
 * @async
 * @param {EquipmentData} equipment - The data payload for the new equipment record.
 * @returns {Promise<EquipmentInstance>} The newly created Equipment instance, including all nested models.
 */
async function createEquipment(equipment) {
	const { id } = await EquipmentModel.create(equipment)
	return await getEquipment(id)
}

/**
 * Updates an existing Equipment record by manually assigning properties and calling save().
 *
 * @async
 * @param {number} id - The ID of the Equipment record to update.
 * @param {EquipmentData} equipment - The updated data payload.
 * @returns {Promise<EquipmentInstance>} The updated Equipment instance, including all nested models.
 */
async function updateEquipment(id, equipment) {
	const instanceEquipment = await getEquipment(id)

	instanceEquipment.equipment_type_id = equipment.equipment_type_id
	instanceEquipment.identifier = equipment.identifier
	instanceEquipment.description = equipment.description
	instanceEquipment.owner_id = equipment.owner_id
	instanceEquipment.division = equipment.division
	instanceEquipment.division_unity_id = equipment.division_unity_id
	instanceEquipment.min_capacity = equipment.min_capacity
	instanceEquipment.max_capacity = equipment.max_capacity
	instanceEquipment.acceptance_criteria = equipment.acceptance_criteria
	instanceEquipment.capacity_unity_id = equipment.capacity_unity_id
	instanceEquipment.calibration_periodicity = equipment.calibration_periodicity
	instanceEquipment.active = equipment.active

	await instanceEquipment.save()

	return await getEquipment(id)
}

/**
 * Retrieves a list of Equipment records with deep associations using Eager Loading.
 * Includes EquipmentType, Owner (with Localization), Unity, and CalibrationPeriodicity.
 *
 * @async
 * @param {object} [whereClause={}] - Optional Sequelize `where` clause for filtering.
 * @returns {Promise<Array<EquipmentInstance>>} An array of Equipment instances with associated data.
 */
async function getAllEquipment(whereClause) {
	return await EquipmentModel.findAll({
		where: whereClause,
		include: [
			{
				model: EquipmentTypeModel,
			},
			{
				model: OwnerModel,
				include: {
					model: LocalizationModel,
				},
			},
			{
				model: UnityModel,
			},
			{
				model: CalibrationPeriodicityModel,
			},
		],
	})
}

/**
 * Finds a single Equipment record by its primary key (ID) with all associated data.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<EquipmentInstance|null>} The Equipment instance or null if not found, including all nested models.
 */
async function getEquipment(id) {
	return await EquipmentModel.findByPk(id, {
		include: [
			{
				model: EquipmentTypeModel,
			},
			{
				model: OwnerModel,
				include: {
					model: LocalizationModel,
				},
			},
			{
				model: UnityModel,
			},
			{
				model: CalibrationPeriodicityModel,
			},
		],
	})
}

/**
 * Finds a single Equipment record by its unique identifier with all associated data.
 *
 * @async
 * @param {string} identifier - The unique identifier of the equipment.
 * @returns {Promise<EquipmentInstance|null>} The Equipment instance or null if not found, including all nested models.
 */
async function getEquipmentByIdentifier(identifier) {
	return await EquipmentModel.findOne({
		where: {
			identifier,
		},
		include: [
			{
				model: EquipmentTypeModel,
			},
			{
				model: OwnerModel,
				include: {
					model: LocalizationModel,
				},
			},
			{
				model: UnityModel,
			},
			{
				model: CalibrationPeriodicityModel,
			},
		],
	})
}

/**
 * Updates only the 'active' status flag of an Equipment record.
 * Uses a direct Model.update query for efficiency and returns the updated instance.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<EquipmentInstance>} The updated Equipment instance, including all nested models.
 */
async function updateEquipmentStatus(id, active) {
	await EquipmentModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getEquipment(id)
}

/**
 * @module EquipmentRepository
 * @description Repository for handling all CRUD and complex queries related to the Equipment model, including deep associations.
 */
export default {
	createEquipment,
	updateEquipment,
	getAllEquipment,
	getEquipment,
	getEquipmentByIdentifier,
	updateEquipmentStatus,
}
