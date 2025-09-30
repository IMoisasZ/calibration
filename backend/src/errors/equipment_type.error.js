import { CustomError } from './customErrors.error.js'

class EquipmentTypeAlreadyAdded extends CustomError {
	constructor(message = 'Bad request') {
		super(message, 400)
	}
}

export { EquipmentTypeAlreadyAdded }
