/** @format */

/**
 * @fileoverview Express-validator middleware definition for validating user login credentials.
 * It ensures the presence and correct format of email and password fields in the request body.
 *
 * @module LoginValidator
 * @requires express-validator
 */
import { body } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**
 * @const {Array<Function>} loginValidator
 * @description Full validator set for the login endpoint. Checks for required email and password, and email formatting.
 */
const loginValidator = [
	body('email')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.LOGIN.EMAIL_NOT_PROVIDE')
		)
		.isEmail()
		.withMessage((value, { req }) =>
			req.__(
				'VALIDATION.MIDDLEWARES.LOGIN.EMAIL_SHOULD_BE_FORMATED_LIKE_AN_EMAIL'
			)
		),
	body('password')
		.notEmpty()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.LOGIN.PASSWORD_NOT_PROVIDE')
		)
		.isString()
		.withMessage((value, { req }) =>
			req.__('VALIDATION.MIDDLEWARES.LOGIN.DATA_TYPE_SHOULD_BE_A_TEXT')
		),
	validationResult(),
]

export { loginValidator }
