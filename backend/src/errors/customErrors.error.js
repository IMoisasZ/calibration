/** @format */

/**
 * @fileoverview Defines custom error classes for standardized error handling in a RESTful API.
 * Each class extends the native JavaScript Error and includes an HTTP status code property.
 *
 * @module CustomErrors
 */

/**
 * @class CustomError
 * @augments {Error}
 * @description Base class for all application-specific errors.
 * It ensures that all custom errors carry an HTTP status code and a predictable name.
 */
class CustomError extends Error {
	/**
	 * Creates an instance of CustomError.
	 * @param {string} message - The error message.
	 * @param {number} status - The corresponding HTTP status code (e.g., 400, 404).
	 */
	constructor(message, status) {
		super(message)
		/**
		 * The name of the error class.
		 * @type {string}
		 */
		this.name = this.constructor.name
		/**
		 * The HTTP status code associated with this error.
		 * @type {number}
		 */
		this.status = status
	}
}
/**
 * @class UnauthorizedError
 * @augments {CustomError}
 * @description Error used for authentication failures or when credentials are missing/invalid.
 * Maps to HTTP Status Code 401.
 */
class UnauthorizedError extends CustomError {
	/**
	 * Creates an instance of UnauthorizedError.
	 * @param {string} [message='Unauthorized access'] - The error message.
	 */
	constructor(message = 'Unauthorized access') {
		super(message, 401)
	}
}

/**
 * @class NotFoundError
 * @augments {CustomError}
 * @description Error used when a requested resource could not be found.
 * Maps to HTTP Status Code 404.
 */
class NotFoundError extends CustomError {
	/**
	 * Creates an instance of NotFoundError.
	 * @param {string} [message='Resource not found'] - The error message.
	 */
	constructor(message = 'Resource not found') {
		super(message, 404)
	}
}

/**
 * @class BadRequestError
 * @augments {CustomError}
 * @description Error used for invalid client input (e.g., missing fields, invalid format).
 * Maps to HTTP Status Code 400.
 */
class BadRequestError extends CustomError {
	/**
	 * Creates an instance of BadRequestError.
	 * @param {string} [message='Bad request'] - The error message.
	 */
	constructor(message = 'Bad request') {
		super(message, 400)
	}
}

/**
 * @class AlreadyAdded
 * @augments {CustomError}
 * @description Error used when an attempted action violates a unique constraint (e.g., creating a duplicate resource).
 * Maps to HTTP Status Code 409 (Conflict).
 */
class AlreadyAdded extends CustomError {
	/**
	 * Creates an instance of AlreadyAdded.
	 * @param {string} [message='Bad request'] - The error message (ideally should be 'Resource conflict' or similar).
	 */
	constructor(message = 'Conflict on resource creation') {
		super(message, 409)
	}
}

export {
	UnauthorizedError,
	CustomError,
	NotFoundError,
	BadRequestError,
	AlreadyAdded,
}
