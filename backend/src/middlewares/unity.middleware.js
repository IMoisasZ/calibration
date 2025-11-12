/** @format */

/**
 * @fileoverview Express-validator middleware definitions for validating requests related to the Unity (Unit of Measure) entity.
 * It ensures the presence and correct type for description, tag, active status, and identifiers.
 *
 * @module UnityValidators
 * @requires express-validator
 */
import { param, body, query } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * @const {Array<Function>} unityBodyValidator
 * @description Validator chain for the core properties in the request body (description, tag, and active status).
 */
const unityBodyValidator = [
	body('description')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.UNITY_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
	body('tag')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.TAG_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
	body('active')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.ACTIVE_NOT_PROVIDE')
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.DATA_TYPE_SHOULD_BE_A_BOOLEAN')
		),
]

/**
 * @const {Array<Function>} unityBodyActiveValidator
 * @description Validator chain specifically for the 'active' status field in the request body (boolean).
 */
const unityBodyActiveValidator = [
	body('active')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.ACTIVE_NOT_PROVIDE')
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.DATA_TYPE_SHOULD_BE_A_BOOLEAN')
		),
]

/**
 * @const {Array<Function>} unityParamValidator
 * @description Validator chain for the 'id' route parameter (Unity ID).
 */
const unityParamValidator = [
	param('id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.UNITY_ID_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
]

/**
 * @const {Array<Function>} unityQueryValidator
 * @description Validator chain for the 'status' query parameter, used for filtering unity lists.
 */
const unityQueryValidator = [
	query('status')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.STATUS_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.UNITY.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
]

/**
 * @const {Array<Function>} createUnityValidator
 * @description Full validator set for creating a new Unity record.
 */
const createUnityValidator = [...unityBodyValidator, validationResult()]

/**
 * @const {Array<Function>} updateUnityValidator
 * @description Full validator set for updating an existing Unity record. Requires ID parameter and full body validation.
 */
const updateUnityValidator = [
	...unityParamValidator,
	...unityBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getAllUnityValidator
 * @description Full validator set for retrieving a list of Unity records, ensuring the 'status' query filter is valid.
 */
const getAllUnityValidator = [...unityQueryValidator, validationResult()]

/**
 * @const {Array<Function>} getUnityValidator
 * @description Full validator set for retrieving a single Unity record by ID.
 */
const getUnityValidator = [...unityParamValidator, validationResult()]

/**
 * @const {Array<Function>} updateUnityStatusValidator
 * @description Full validator set for updating the active status of a Unity record (PATCH operation).
 */
const updateUnityStatusValidator = [
	...unityParamValidator,
	...unityBodyActiveValidator,
	validationResult(),
]

export {
	createUnityValidator,
	updateUnityValidator,
	getAllUnityValidator,
	getUnityValidator,
	updateUnityStatusValidator,
}
