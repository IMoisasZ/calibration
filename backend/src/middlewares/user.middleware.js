/** @format */

/**
 * @fileoverview Express-validator middleware definitions for validating requests related to the User entity.
 * It enforces rules for user creation, updates, password length, and role restrictions.
 *
 * @module UserValidators
 * @requires express-validator
 */
import { body, param, query } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * @const {Object} PASSWORD_LENGHT
 * @description Defines the minimum and maximum allowed length for the user password.
 */
const PASSWORD_LENGHT = { min: 6, max: 20 }

/**
 * @const {Array<Function>} createUserRequiredFields
 * @description Ensures the primary fields for user creation are present and non-empty.
 */
const createUserRequiredFields = [
	body(['user_name', 'role', 'email', 'password'])
		.exists()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.FIELD_REQUIRED_NOT_PROVIDE')
		)
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.FIELD_REQUIRED_SHOULD_NOT_BE_BALNK')
		),
]

/**
 * @const {Array<Function>} userBodyValidator
 * @description Validator chain for optional fields, typically used in update operations.
 */
const userBodyValidator = [
	body('user_name')
		.optional()
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
	body('role')
		.optional()
		.isIn(['MASTER', 'ADMINISTRADOR', 'USUARIO'])
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.ALLOW_MASTER_ADMINISTRADOR_USUARIO')
		),
	body('email')
		.optional()
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.DATA_TYPE_SHOULD_BE_A_TEXT')
		)
		.isEmail()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.USER.EMAIL_SHOULD_BE_FORMATED_LIKE_AN_EMAIL'
			)
		),
	body('password')
		.optional()
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.DATA_TYPE_SHOULD_BE_A_TEXT')
		)
		.isLength({ min: PASSWORD_LENGHT.min, max: PASSWORD_LENGHT.max })
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.USER.PASSWORD_LENGTH',
				PASSWORD_LENGHT.min,
				PASSWORD_LENGHT.max
			)
		),
]

/**
 * @const {Array<Function>} userBodyActiveValidator
 * @description Validator chain for updating the 'active' status flag.
 */
const userBodyActiveValidator = [
	body('active')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.ACTIVE_NOT_PROVIDE')
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.DATA_TYPE_SHOULD_BE_A_BOOLEAN')
		),
]

/**
 * @const {Array<Function>} userParamValidator
 * @description Validator chain for the 'id' route parameter (User ID). Uses isInt for precise ID validation.
 */
const userParamValidator = [
	param('id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.USER_ID_NOT_PROVIDE')
		)
		.isInt()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
]

/**
 * @const {Array<Function>} userQueryValidator
 * @description Validator chain for the 'active' query parameter (for filtering).
 */
const userQueryValidator = [
	query('active')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.ACTIVE_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
]

/**
 * @const {Array<Function>} userQueryEmailValidator
 * @description Validator chain for the 'email' query parameter (for lookup).
 */
const userQueryEmailValidator = [
	query('email')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.USER.EMAIL_NOT_PROVIDE')
		)
		.isEmail()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.USER.EMAIL_SHOULD_BE_FORMATED_LIKE_AN_EMAIL'
			)
		),
]

/**
 * @const {Array<Function>} createUserValidator
 * @description Full validator set for creating a new user. Combines required fields and body format checks.
 */
const createUserValidator = [
	...createUserRequiredFields,
	...userBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} updateUserValidator
 * @description Full validator set for updating an existing user. Requires ID parameter and uses optional body checks.
 */
const updateUserValidator = [
	...userParamValidator,
	...userBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getAllUsersValidator
 * @description Full validator set for retrieving all users, ensuring the active query filter is valid.
 */
const getAllUsersValidator = [...userQueryValidator, validationResult()]

/**
 * @const {Array<Function>} getUserValidator
 * @description Full validator set for retrieving a single user by ID.
 */
const getUserValidator = [...userParamValidator, validationResult()]

/**
 * @const {Array<Function>} getUserByEmailValidator
 * @description Full validator set for retrieving a user by email query.
 */
const getUserByEmailValidator = [...userQueryEmailValidator, validationResult()]

/**
 * @const {Array<Function>} patchUserDisableEnableValidator
 * @description Full validator set for enabling or disabling a user (status update).
 */
const patchUserDisableEnableValidator = [
	...userParamValidator,
	...userBodyActiveValidator,
	validationResult(),
]

export {
	createUserValidator,
	updateUserValidator,
	getAllUsersValidator,
	getUserValidator,
	getUserByEmailValidator,
	patchUserDisableEnableValidator,
}
