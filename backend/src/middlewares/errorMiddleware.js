/** @format */

/** @description -> Imports of error classes */
import { CustomError } from '../errors/customErrors.error.js'
import {
	ValidationError,
	UniqueConstraintError,
	DatabaseError,
} from 'sequelize'

/**
 * @function errorMiddleware
 * @description Centralized error handling middleware.
 * Ensures all errors result in a standardized JSON response and are logged.
 * @param {Error} err - The captured error object (the first argument must be the error).
 * @param {object} req - Express Request object.
 * @param {object} res - Express Response object.
 * @param {function} next - Function to pass control.
 */
const errorMiddleware = (err, req, res, next) => {
	let status = 500 // Default: Internal Server Error
	let message = 'Internal Server Error'

	/**@description -> 1. CUSTOM ERROR HANDLING (Business Logic) */
	if (err instanceof CustomError) {
		status = err.status
		message = err.message
	} else if (
		/**@description -> 2. SEQUELIZE ERROR HANDLING (Validation and Conflict) */
		err instanceof ValidationError ||
		err instanceof UniqueConstraintError
	) {
		/**@description -> Validation errors and unique key violations */
		status = 400 // Bad Request is appropriate for data errors sent by the client.

		/**@description -> Converts Sequelize error details into a single clean string */
		message = err.errors.map((e) => e.message).join('; ')
	} else if (err instanceof DatabaseError) {
		/**@description -> 3. OTHER DATABASE ERROR HANDLING */
		/**@description -> Errors like invalid SQL syntax or permission issues */
		status = 500
		message = `Database Error: ${err.message}`
	}

	/**@description -> LOGGING: Logs detailed error (status, URL, message, stack) */
	global.logger.error(
		`${status} - ${req.method} ${req.originalUrl} - Message: ${message} - Stack: ${err.stack}`
	)

	/**@description -> RESPONSE: */
	/**@description -> In production, 500 errors should have generic messages for clients (security) */
	if (status === 500 && process.env.NODE_ENV === 'production') {
		// For generic 500 errors, hide error details from the client in production.
		message = 'Internal Server Error'
	}

	return res.status(status).send({ errors: message })
}

export default errorMiddleware
