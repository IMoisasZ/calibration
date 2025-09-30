/** @format */
import { validationResult as expressValidationResult } from 'express-validator'
import { BadRequestError } from '../errors/customErrors.error.js'

function validationResult() {
	return (req, res, next) => {
		const errors = expressValidationResult(req)

		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map((error) => error.msg)
			throw new BadRequestError(errorMessages.join('; '))
		}
		next()
	}
}

export { validationResult }
