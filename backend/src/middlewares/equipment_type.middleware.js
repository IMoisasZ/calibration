/** @format */

/**
 * @fileoverview Express-validator middleware definitions for validating requests related to the EquipmentType entity.
 * It provides chains for validating body, parameters, query filters, and status updates.
 *
 * @module EquipmentTypeValidators
 * @requires express-validator
 */
import { query, param, body } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * @const {Array<Function>} equipmentTypeBodyValidator
 * @description Validator chain for the 'equipment_type' name/description field in the request body.
 */
const equipmentTypeBodyValidator = [
	body('equipment_type')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT_TYPE.EQUIPMENT_TYPE_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT_TYPE.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
]

/**
 * @const {Array<Function>} equipmentTypeParamValidator
 * @description Validator chain for the 'id' route parameter (Equipment Type ID).
 */
const equipmentTypeParamValidator = [
	param('id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.EQUIPMENT_TYPE.EQUIPMENT_TYPE_ID_NOT_PROVIDE'
			)
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.EQUIPMENT_TYPE.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
]

/**
 * @const {Array<Function>} equipmentTypeQueryValidator
 * @description Validator chain for the 'status' query parameter, typically used for filtering lists.
 */
const equipmentTypeQueryValidator = [
	query('status')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT_TYPE.STATUS_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT_TYPE.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
]

/**
 * @const {Array<Function>} equipmentTypeBodyActiveValidator
 * @description Validator chain specifically for the 'active' status field in the request body.
 */
const equipmentTypeBodyActiveValidator = [
	body('active')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT_TYPE.ACTIVE_NOT_PROVIDE')
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.EQUIPMENT_TYPE.DATA_TYPE_SHOULD_BE_A_BOOLEAN'
			)
		),
]

/**
 * @const {Array<Function>} createEquipmentTypeValidator
 * @description Full validator set for creating a new EquipmentType record.
 */
const createEquipmentTypeValidator = [
	...equipmentTypeBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} updateEquipmentTypeValidator
 * @description Full validator set for updating an existing EquipmentType record. Requires ID parameter and full body.
 */
const updateEquipmentTypeValidator = [
	...equipmentTypeParamValidator,
	...equipmentTypeBodyValidator,
	...equipmentTypeBodyActiveValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getAllEquipmentTypeValidator
 * @description Full validator set for retrieving a list of EquipmentTypes, ensuring the 'status' query filter is valid.
 */
const getAllEquipmentTypeValidator = [
	...equipmentTypeQueryValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getEquipmentTypeValidator
 * @description Full validator set for retrieving a single EquipmentType record by ID.
 */
const getEquipmentTypeValidator = [
	...equipmentTypeParamValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} updateEquipmentTypeStatusValidator
 * @description Full validator set for updating only the active status of an EquipmentType record (PATCH operation).
 */
const updateEquipmentTypeStatusValidator = [
	...equipmentTypeParamValidator,
	...equipmentTypeBodyActiveValidator,
	validationResult(),
]

export {
	createEquipmentTypeValidator,
	updateEquipmentTypeValidator,
	getAllEquipmentTypeValidator,
	getEquipmentTypeValidator,
	updateEquipmentTypeStatusValidator,
}
