import { CustomError } from './customErrors.error.js'

class UnityAlreadyAdded extends CustomError {
	constructor(message = 'Bad request') {
		super(message, 400)
	}
}

export { UnityAlreadyAdded }
