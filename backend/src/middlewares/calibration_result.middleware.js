/** @format */

/**
 * @fileoverview Express-validator middleware definitions for validating requests related to the CalibrationResult entity.
 * This entity captures the technical measurements and status of a calibration execution.
 *
 * @module CalibrationResultValidators
 * @requires express-validator
 */

import { param, body } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * @const {Array<Function>} calibrationResultBodyValidator
 * @description Validator chain for all properties in the request body when creating or fully updating a CalibrationResult record.
 * Includes foreign keys, mandatory fields, and optional numeric/status fields.
 */
const calibrationResultBodyValidator = [
	body('calibration_id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.CALIBRATION_ID_NOT_PROVIDE'
			)
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
	body('factor_id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.FACTOR_ID_NOT_PROVIDE')
		)
		.isInt()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
	body('measuring_range')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.MEASURING_RANGE_NOT_PROVIDE'
			)
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_TEXT'
			)
		),
	body('optimal_resolution')
		.optional()
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
	body('identifier')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.IDENTIFIER_NOT_PROVIDE')
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_BOLLEAN'
			)
		),
	body('environmental_conditions')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.ENVIRONMENTAL_CONDITIONS_NOT_PROVIDE'
			)
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_BOLLEAN'
			)
		),
	body('biggest_deviation')
		.optional()
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
	body('measurement_uncertainty')
		.optional()
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
	body('biggest_deviation_plus_measurement_uncertainty')
		.optional()
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
	body('status_result')
		.optional()
		.isString()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_TEXT'
			)
		)
		.isIn(['APROVADO', 'REPROVADO'])
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.INFO_APROVED_OR_REPROVED'
			)
		),
]

/**
 * @const {Array<Function>} calibrationResultBodyStatusResultValidator
 * @description Validator chain for updating only the 'status_result' field (PATCH operation).
 */
const calibrationResultBodyStatusResultValidator = [
	body('status_result')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.STATUS_RESULT_NOT_PROVIDE'
			)
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_TEXT'
			)
		),
]

/**
 * @const {Array<Function>} calibrationResultParamIDValidator
 * @description Validator chain for the route parameter 'id' (referring to the CalibrationResult ID).
 */
const calibrationResultParamIDValidator = [
	param('id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.CALIBRATION_RESULT_ID_NOT_PROVIDE'
			)
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
]

/**
 * @const {Array<Function>} calibrationResultParamCalibrationIDValidator
 * @description Validator chain for the route parameter 'calibration_id' (referring to the parent Calibration record ID).
 */
const calibrationResultParamCalibrationIDValidator = [
	param('calibration_id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.CALIBRATION_RESULT_ID_NOT_PROVIDE'
			)
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_RESULT.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
]

/**
 * @const {Array<Function>} createCalibrationResultValidator
 * @description Full validator set for creating a new CalibrationResult record.
 */
const createCalibrationResultValidator = [
	...calibrationResultBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} updateCalibrationResultValidator
 * @description Full validator set for updating an existing CalibrationResult record by its ID.
 */
const updateCalibrationResultValidator = [
	...calibrationResultParamIDValidator,
	...calibrationResultBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getAllCalibrationResultByCalibrationIdValidator
 * @description Full validator set for retrieving all results associated with a specific Calibration ID.
 */
const getAllCalibrationResultByCalibrationIdValidator = [
	...calibrationResultParamCalibrationIDValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getCalibrationResultValidator
 * @description Full validator set for retrieving a single CalibrationResult record by its ID.
 */
const getCalibrationResultValidator = [
	...calibrationResultParamIDValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} updateCalibrationResultStatusValidator
 * @description Full validator set for updating the status_result of a CalibrationResult record (PATCH).
 */
const updateCalibrationResultStatusValidator = [
	...calibrationResultParamIDValidator,
	...calibrationResultBodyStatusResultValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} deleteCalibrationResultValidator
 * @description Full validator set for deleting a CalibrationResult record by its ID.
 */
const deleteCalibrationResultValidator = [
	...calibrationResultParamIDValidator,
	validationResult(),
]

export {
	createCalibrationResultValidator,
	updateCalibrationResultValidator,
	getAllCalibrationResultByCalibrationIdValidator,
	getCalibrationResultValidator,
	updateCalibrationResultStatusValidator,
	deleteCalibrationResultValidator,
}
