/** @format */

/**
 * @fileoverview Express-validator middleware definitions for validating requests related to the CalibrationConfig entity.
 * It uses express-validator chains and integrates with a custom validationResult utility for error handling.
 * Messages are fetched using i18n functions (req.__).
 *
 * @module CalibrationConfigValidators
 * @requires express-validator
 */
import { body, query, param } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * @const {Array} calibrationConfigBodyValidator
 * @description Validator chain for the request body when creating/updating a CalibrationConfig.
 * Assumes the payload requires a 'factor'.
 */
const calibrationConfigBodyValidator = [
	body('factor')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLWARES.CALIBRATION_CONFIG.FACTOR_NOT_PROVIDE')
		)
		.isInt({ min: 1 })
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLWARES.CALIBRATION_CONFIG.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
]

/**
 * @const {Array} calibrationConfigQueryValidator
 * @description Validator chain for the query parameter 'actual'.
 * Used typically for listing/filtering records by their active status.
 */
const calibrationConfigQueryValidator = [
	query('actual')
		.exists()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLWARES.CALIBRATION_CONFIG.PARAMETER_DID_NOT_PROVIDE'
			)
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLWARES.CALIBRATION_CONFIG.DATA_TYPE_SHOUD_BE_A_TEXT'
			)
		)
		.isIn(['true', 'false'])
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLWARES.CALIBRATION_CONFIG.VALUE_ACTUAL_SHOUL_BE_TRUE_OR_FALSE'
			)
		),
]

/**
 * @const {Array} calibrationConfigParamValidator
 * @description Validator chain for the route parameter 'id'.
 * Used for fetching, updating, or deleting a specific record.
 */
const calibrationConfigParamValidator = [
	param('id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLWARES.CALIBRATION_CONFIG.ID_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLWARES.CALIBRATION_CONFIG.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
]

/**
 * @const {Array<Function>} updateCalibrationConfigToNoActualAndCreateValidator
 * @description Validator set for creating a new CalibrationConfig or updating an existing one.
 * Combines the body validation with the final error handler.
 */
const updateCalibrationConfigToNoActualAndCreateValidator = [
	...calibrationConfigBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getAllCalibrationConfigValidator
 * @description Validator set for retrieving a list of CalibrationConfig records.
 * Ensures the 'actual' query parameter is present and valid.
 */
const getAllCalibrationConfigValidator = [
	...calibrationConfigQueryValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getCalibrationConfigValidator
 * @description Validator set for retrieving a single CalibrationConfig record by ID.
 * Ensures the 'id' route parameter is present and valid.
 */
const getCalibrationConfigValidator = [
	...calibrationConfigParamValidator,
	validationResult(),
]

export {
	updateCalibrationConfigToNoActualAndCreateValidator,
	getAllCalibrationConfigValidator,
	getCalibrationConfigValidator,
}
