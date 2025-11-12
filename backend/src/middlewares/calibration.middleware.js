/** @format */

/**
 * @fileoverview Express-validator middleware definitions for validating requests related to the Calibration entity.
 * This entity manages the records of calibration events for equipment.
 *
 * @module CalibrationValidators
 * @requires express-validator
 */
import { param, body, query } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * @const {Array<Function>} calibrationBodyValidator
 * @description Validator chain for the core properties in the request body for creating or updating a Calibration record.
 */
const calibrationBodyValidator = [
	body('user_id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.USER_ID_NOT_PROVIDE')
		)
		.isLength()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
	body('equipment_id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.EQUIPMENT_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
	body('calibration_date')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.CALIBRATION_DATE_NOT_PROVIDE')
		)
		.isDate()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.DATA_TYPE_SHOULD_BE_A_DATE')
		),
	body('next_calibration')
		.isDate()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.DATA_TYPE_SHOULD_BE_A_DATE')
		),
	body('certificate_number')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION.NUMBER_OF_CERTIFICATE_NOT_PROVIDE'
			)
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
	body('calibration_status')
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.DATA_TYPE_SHOULD_BE_A_TEXT')
		)
		.isIn(['EM ANALISE', 'APROVADO', 'REPROVADO'])
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
]

/**
 * @const {Array<Function>} calibrationBodyAnalysisValidator
 * @description Validator chain for updating the 'is_analysis' flag in the request body.
 */
const calibrationBodyAnalysisValidator = [
	body('is_analysis')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.ANALYSIS_NOT_PROVIDE')
		)
		.isBoolean()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.DATA_TYPE_SHOULD_BE_A_BOLLEAN')
		),
]

/**
 * @const {Array<Function>} calibrationParamValidator
 * @description Validator chain for the 'id' route parameter (Calibration ID).
 */
const calibrationParamValidator = [
	param('id')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.CALIBRATION_ID_NOT_PROVIDE')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.DATA_TYPE_SHOULD_BE_A_NUMBER')
		),
]

/**
 * @const {Array<Function>} calibrationQueryCalibration
 * @description Validator chain for the 'status' query parameter, used for filtering calibration lists.
 */
const calibrationQueryCalibration = [
	query('status')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION.CALIBRATION_STATUS_NOT_PROVIDE'
			)
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION.DATA_TYPE_SHOULD_BE_A_TEXT')
		)
		.isIn(['EM ANALISE', 'APROVADO', 'REPROVADO'])
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION.STATUS_SHOULD_BE_IN_ANALYSIS_APPROVED_REPPROVED'
			)
		),
]

/**
 * @const {Array<Function>} createCalibrationValidator
 * @description Full validator set for creating a new Calibration record.
 */
const createCalibrationValidator = [
	...calibrationBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} updateCalibrationValidator
 * @description Full validator set for updating an existing Calibration record. Requires ID parameter and full body validation.
 */
const updateCalibrationValidator = [
	...calibrationParamValidator,
	...calibrationBodyValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} getAllCalibrationsValidator
 * @description Full validator set for retrieving a list of Calibrations, ensuring the 'status' query filter is valid.
 */
const getAllCalibrationsValidator = [
	...calibrationQueryCalibration,
	validationResult(),
]

/**
 * @const {Array<Function>} getCalibrationValidator
 * @description Full validator set for retrieving a single Calibration record by ID.
 */
const getCalibrationValidator = [
	...calibrationParamValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} deleteCalibrationValidator
 * @description Full validator set for deleting a Calibration record by ID.
 */
const deleteCalibrationValidator = [
	...calibrationParamValidator,
	validationResult(),
]

/**
 * @const {Array<Function>} patchCalibrationByCalibrationAnalysis
 * @description Full validator set for updating the analysis status of a Calibration record.
 */
const patchCalibrationByCalibrationAnalysis = [
	...calibrationParamValidator,
	...calibrationBodyAnalysisValidator,
	validationResult(),
]

export {
	createCalibrationValidator,
	updateCalibrationValidator,
	getAllCalibrationsValidator,
	getCalibrationValidator,
	deleteCalibrationValidator,
	patchCalibrationByCalibrationAnalysis,
}
