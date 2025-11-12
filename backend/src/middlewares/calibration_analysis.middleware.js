/** @format */
/**
 * @fileoverview Validation middleware for the Calibration Analysis request body.
 * It uses express-validator combined with dynamic i18n translation for localized error messages.
 * @module validators/calibrationAnalysisValidator
 */
import { body } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * Defines the minimum and maximum length constraints for the 'notes' field.
 * @type {object}
 * @property {number} min - Minimum allowed length (15 characters).
 * @property {number} max - Maximum allowed length (500 characters).
 */
const lengthNotes = { min: 15, max: 500 }

/**
 * Array of validation rules for the 'Calibration Analysis' request body fields.
 * Error messages are dynamically translated using the request's locale (`req.__`).
 * NOTE: The 'user_id' field is recommended to be injected from the authenticated token (req.userId)
 * in the controller, not supplied by the client in the body, for security reasons.
 * @type {Array<Function>}
 */
const calibrationAnalysisBodyValidator = [
	// --- calibration_id validation ---
	body('calibration_id')
		.exists()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLWARES.CALIBRATION_ANALYSIS.CALIBRATION_ID_NOT_PROVIDE'
			)
		)
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLWARES.CALIBRATION_ANALYSIS.CALIBRATION_ID_NOT_BE_NULL'
			)
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLWARES.CALIBRATION_ANALYSIS.CALIBRATION_ID_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
	// --- original_status validation ---
	body('original_status')
		.exists()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.ORIGINAL_STATUS_NOT_PROVIDE'
			)
		)
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.ORIGINAL_STATUS_NOT_BE_NULL'
			)
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.ORIGINAL_STATUS_TYPE_SHOULD_BE_A_TEXT'
			)
		)
		.isIn([
			...req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.ORIGINAL_STATUS_SHOULD_BE'
			),
		])
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.ORIGINAL_STATUS_ACCEPTS_ARE'
			)
		),
	// --- decision_status validation ---
	body('decision_status')
		.exists()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.DECISION_STATUS_NOT_PROVIDE'
			)
		)
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.DECISION_STATUS_NOT_BE_NULL'
			)
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.DECISION_STATUS_SHOULD_BE_A_TEXT'
			)
		)
		.isIn([
			...req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.DECISION_STATUS_SHOULD_BE'
			),
		])
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.DECISION_STATUS_ACCEPTS_ARE'
			)
		),
	// --- user_id validation ---
	body('user_id')
		.exists()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.USER_ID_NOT_PROVIDE')
		)
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.USER_ID_NOT_BE_NULL')
		)
		.isNumeric()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.USER_ID_TYPE_SHOULD_BE_A_NUMBER'
			)
		),
	// --- notes validation ---
	body('notes')
		.exists()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.NOTES_NOT_PROVIDE')
		)
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.NOTES_NOT_BE_NULL')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.NOTES_TYPE_SHOULD_BE_A_TEXT'
			)
		)
		.isLength({ min: lengthNotes.min, max: lengthNotes.max })
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.CALIBRATION_ANALYSIS.NOTES_QUANTITY_SHOULD_HAVE',
				lengthNotes.min,
				lengthNotes.max
			)
		),
]

/**
 * The final validation chain for creating a Calibration Analysis record.
 * Combines the body validation rules with the custom error handling middleware (`validationResult`).
 * @type {Array<Function>}
 */
const createCalibrationAnalysisValidator = [
	...calibrationAnalysisBodyValidator,
	validationResult(),
]

export { createCalibrationAnalysisValidator }
