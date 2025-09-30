import { CustomError } from './customErrors.error.js'

class LocalizationAlreadyAdded extends CustomError {
	constructor(message = 'Bad request') {
		super(message, 400)
	}
}

export { LocalizationAlreadyAdded }
