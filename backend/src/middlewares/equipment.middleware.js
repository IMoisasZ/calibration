/** @format */

/**
 * @fileoverview Express-validator middleware definitions for validating requests related to the Equipment entity.
 * It enforces presence and data types for creation, updates, and filtering operations.
 *
 * @module EquipmentValidators
 * @requires express-validator
 */
import { query, param, body } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * @const {Array<Function>} equipmentBodyValidator
 * @description Validator chain for the core properties in the request body when creating or updating an Equipment record.
 */
const equipmentBodyValidator = [
	body('description')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DESCRIPTION_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
	body('owner_id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.OWNER_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
	body('identifier')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.IDENTIFIER_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
	body('division')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DIVISION_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
	body('unity_id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.UNITY_ID_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
	body('min_capacity')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.MIN_CAPACITY_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
	body('max_capacity')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.MAX_CAPACITY_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
	body('acceptance_criteria')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.ACCEPTANCE_CRITERIA_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
	body('calibration_periodicity_id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.EQUIPMENT.CALIBRATION_PERIODICITY_ID_NOT_PROVIDE'
			)
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
	body('active')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.ACTIVE_NOT_PROVIDE')
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_BOOLEAN')
		),
]

/**
 * @const {Array<Function>} equipmentActiveValidator
 * @description Validator chain specifically for the 'active' status field in the request body (e.g., for PATCH operations).
 */
const equipmentActiveValidator = [
	body('active')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.ACTIVE_NOT_PROVIDE')
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_BOOLEAN')
		),
]

/**
 * @const {Array<Function>} equipmentParamValidator
 * @description Validator chain for the 'id' route parameter (Equipment ID).
 */
const equipmentParamValidator = [
	param('id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.EQUIPMENT_ID_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
]

/**
 * @const {Array<Function>} equipmentQueryValidator
 * @description Validator chain for the 'status' query parameter, typically used for filtering lists.
 */
const equipmentQueryValidator = [
	query('status')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.STATUS_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
]

/**
 * @const {Array<Function>} createEquipmentValidator
 * @description Full validator set for creating a new Equipment record.
 */
const createEquipmentValidator = [...equipmentBodyValidator, validationResult()]

/**
 * @const {Array<Function>} updateEquipmentValidator
 * @description Full validator set for updating an existing Equipment record. Requires ID parameter and full body validation.
 */
const updateEquipmentValidator = [
	...equipmentParamValidator,
	...equipmentBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getAllEquipmentValidator
 * @description Full validator set for retrieving a list of Equipment records, ensuring the 'status' query filter is valid.
 */
const getAllEquipmentValidator = [
	...equipmentQueryValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getEquipmentValidator
 * @description Full validator set for retrieving a single Equipment record by ID.
 */
const getEquipmentValidator = [...equipmentParamValidator, validationResult()]

/**
 * @const {Array<Function>} getEquipmentByIdentifierValidator
 * @description Full validator set for retrieving a single Equipment record by its unique identifier (string).
 * Note: Error messages are hardcoded in Portuguese, breaking i18n consistency.
 */
const getEquipmentByIdentifierValidator = [
	param('identifier')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.IDENTIFIER_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.EQUIPMENT.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
	validationResult(),
]

/**
 * @const {Array<Function>} updateEquipmentStatus
 * @description Full validator set for updating the active status of an Equipment record.
 */
const updateEquipmentStatus = [
	...equipmentParamValidator,
	...equipmentActiveValidator,
	validationResult(),
]

export {
	createEquipmentValidator,
	updateEquipmentValidator,
	getAllEquipmentValidator,
	getEquipmentValidator,
	getEquipmentByIdentifierValidator,
	updateEquipmentStatus,
}
