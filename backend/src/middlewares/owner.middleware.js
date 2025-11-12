/** @format */

/**
 * @fileoverview Express-validator middleware definitions for validating requests related to the Owner entity.
 * This entity represents the owner or responsible party for an equipment, and includes basic CRUD and status checks.
 *
 * @module OwnerValidators
 * @requires express-validator
 */
import { param, body, query } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * @const {Array<Function>} ownerBodyValidator
 * @description Validator chain for the core properties in the request body (owner name and localization foreign key).
 */
const ownerBodyValidator = [
	body('owner')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.OWNER.OWNER_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.OWNER.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
	body('localization_id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.OWNER.LOCALIZATION_ID_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.OWNER.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
]

/**
 * @const {Array<Function>} ownerBodyActiveValidator
 * @description Validator chain specifically for the 'active' status field in the request body (boolean).
 */
const ownerBodyActiveValidator = [
	body('active')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.OWNER.ACTIVE_NOT_PROVIDE')
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.OWNER.DATA_TYPE_SHOULD_BE_A_BOOLEAN')
		),
]

/**
 * @const {Array<Function>} ownerParamValidator
 * @description Validator chain for the 'id' route parameter (Owner ID).
 */
const ownerParamValidator = [
	param('id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.OWNER.OWNER_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.OWNER.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
]

/**
 * @const {Array<Function>} ownerQueryValidator
 * @description Validator chain for the 'status' query parameter, used for filtering owner lists.
 */
const ownerQueryValidator = [
	query('status')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.OWNER.STATUS_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.OWNER.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
]

/**
 * @const {Array<Function>} createOwnerValidator
 * @description Full validator set for creating a new Owner record.
 */
const createOwnerValidator = [...ownerBodyValidator, validationResult()]

/**
 * @const {Array<Function>} updateOwnerValidator
 * @description Full validator set for updating an existing Owner record. Requires ID parameter and body validation.
 */
const updateOwnerValidator = [
	...ownerParamValidator,
	...ownerBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getAllOwnerValidator
 * @description Full validator set for retrieving a list of Owners, ensuring the 'status' query filter is valid.
 */
const getAllOwnerValidator = [...ownerQueryValidator, validationResult()]

/**
 * @const {Array<Function>} getOwnerValidator
 * @description Full validator set for retrieving a single Owner record by ID.
 */
const getOwnerValidator = [...ownerParamValidator, validationResult()]

/**
 * @const {Array<Function>} updateOwnerStatusValidator
 * @description Full validator set for updating the active status of an Owner record (PATCH operation).
 */
const updateOwnerStatusValidator = [
	...ownerParamValidator,
	...ownerBodyActiveValidator,
	validationResult(),
]

export {
	createOwnerValidator,
	updateOwnerValidator,
	getAllOwnerValidator,
	getOwnerValidator,
	updateOwnerStatusValidator,
}
