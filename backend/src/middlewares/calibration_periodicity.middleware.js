/** @format */

/**
 * @fileoverview Express-validator middleware definitions for validating requests related to the CalibrationPeriodicity entity.
 * It enforces data types, presence, and formats for creation, updating, and status management.
 *
 * @module CalibrationPeriodicityValidators
 * @requires express-validator
 */

import { param, body, query } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * @const {Array<Function>} calibrationPeriodicityBodyValidator
 * @description Validator chain for the core properties in the request body (description and calibration_days).
 */
const calibrationPeriodicityBodyValidator = [
	body('description')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_PERIODICITY.DESCRIPTION_NOT_PROVIDE'
			)
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_PERIODICITY.DATA_TYPE_SHOUD_BE_A_TEXT'
			)
		),
	body('calibration_days')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_PERIODICITY.REFERENCES_QUANTITY_OF_DAYS_ABOUT_DESCRIPTION'
			)
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_PERIODICITY.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
]

/**
 * @const {Array<Function>} calibrationPeriodicityBodyActiveValidator
 * @description Validator chain specifically for the 'active' status property in the request body.
 */
const calibrationPeriodicityBodyActiveValidator = [
	body('active')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_PERIODICITY.ACTIVE_NOT_PROVIDE'
			)
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_PERIODICITY.DATA_TYPE_SHOULD_BE_A_BOLLEAN'
			)
		),
]

/**
 * @const {Array<Function>} calibrationPeriodicityParamValidator
 * @description Validator chain for the 'id' route parameter.
 */
const calibrationPeriodicityParamValidator = [
	param('id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION_PERIODICITY.ID_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_PERIODICITY.DATA_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
]

/**
 * @const {Array<Function>} calibrationPeriodicityQueryValidator
 * @description Validator chain for the 'status' query parameter (used for filtering lists).
 */
const calibrationPeriodicityQueryValidator = [
	query('status')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_PERIODICITY.STATUS_NOT_PROVIDE'
			)
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_PERIODICITY.DATA_TYPE_SHOULD_BE_A_TEXT'
			)
		),
]

/**
 * @const {Array<Function>} createCalibrationPeriodicityValidator
 * @description Full validator set for creating a new CalibrationPeriodicity record.
 */
const createCalibrationPeriodicityValidator = [
	...calibrationPeriodicityBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} updateCalibrationPeriodicityValidator
 * @description Full validator set for updating an existing CalibrationPeriodicity record.
 * Requires both the ID parameter and the body fields.
 */
const updateCalibrationPeriodicityValidator = [
	...calibrationPeriodicityParamValidator,
	...calibrationPeriodicityBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getAllCalibrationPeriodicityValidator
 * @description Full validator set for retrieving a list of CalibrationPeriodicity records, ensuring the 'status' query filter is valid.
 */
const getAllCalibrationPeriodicityValidator = [
	...calibrationPeriodicityQueryValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getCalibrationPeriodicityValidator
 * @description Full validator set for retrieving a single CalibrationPeriodicity record by ID.
 */
const getCalibrationPeriodicityValidator = [
	...calibrationPeriodicityParamValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} updateCalibrationPeriodicityStatusValidator
 * @description Full validator set for updating the active status of a CalibrationPeriodicity record (PATCH).
 * Requires both the ID parameter and the 'active' body field.
 */
const updateCalibrationPeriodicityStatusValidator = [
	...calibrationPeriodicityParamValidator,
	...calibrationPeriodicityBodyActiveValidator,
	validationResult(),
]

export {
	createCalibrationPeriodicityValidator,
	updateCalibrationPeriodicityValidator,
	getAllCalibrationPeriodicityValidator,
	getCalibrationPeriodicityValidator,
	updateCalibrationPeriodicityStatusValidator,
}
