/** @format */

/**
 * @fileoverview Express-validator middleware definitions for validating requests related to the Localization entity.
 * This covers validation for parameters, request body (description/active status), and query filters.
 *
 * @module LocalizationValidators
 * @requires express-validator
 */
import { param, body, query } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * @const {Array<Function>} localizationParamValidation
 * @description Validator chain for the 'id' route parameter (Localization ID).
 */
const localizationParamValidation = [
	param('id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.LOCALIZATION.LOCALIZATION_ID_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.LOCALIZATION.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
]

/**
 * @const {Array<Function>} localizationBodyValidation
 * @description Validator chain for the core properties in the request body (description and active status).
 */
const localizationBodyValidation = [
	body('description')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.LOCALIZATION.DESCRIPTION_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.LOCALIZATION.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
	body('active')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.LOCALIZATION.LOCALIZATION_ACTIVE_NOT_PROVIDE'
			)
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.LOCALIZATION.DATA_TYPE_SHOULD_BE_A_BOOLEAN'
			)
		),
]

/**
 * @const {Array<Function>} localizationQueryValidator
 * @description Validator chain for the 'status' query parameter, used for filtering localization lists.
 */
const localizationQueryValidator = [
	query('status')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.LOCALIZATION.STATUS_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.LOCALIZATION.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
]

/**
 * @const {Array<Function>} createLocalizationValidate
 * @description Full validator set for creating a new Localization record.
 */
const createLocalizationValidate = [
	...localizationBodyValidation,
	validationResult(),
]

/**
 * @const {Array<Function>} updateLocalizationValidate
 * @description Full validator set for updating an existing Localization record. Requires ID parameter and body validation.
 */
const updateLocalizationValidate = [
	...localizationParamValidation,
	...localizationBodyValidation,
	validationResult(),
]

/**
 * @const {Array<Function>} getAllLocalizationValidator
 * @description Full validator set for retrieving a list of Localizations, ensuring the 'status' query filter is valid.
 */
const getAllLocalizationValidator = [
	...localizationQueryValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getLocalizationValidate
 * @description Full validator set for retrieving a single Localization record by ID.
 */
const getLocalizationValidate = [
	...localizationParamValidation,
	validationResult(),
]

/**
 * @const {Array<Function>} updateLocalizationStatusValidate
 * @description Full validator set for updating the active status of a Localization record (PATCH operation).
 */
const updateLocalizationStatusValidate = [
	...localizationParamValidation,
	body('active')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.LOCALIZATION.LOCALIZATION_ACTIVE_NOT_PROVIDE'
			)
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.LOCALIZATION.DATA_TYPE_SHOULD_BE_A_BOOLEAN'
			)
		),
	validationResult(),
]

export {
	createLocalizationValidate,
	updateLocalizationValidate,
	getAllLocalizationValidator,
	getLocalizationValidate,
	updateLocalizationStatusValidate,
}
