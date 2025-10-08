import { body } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

const loginValidator = [
	body('email')
		.notEmpty()
		.withMessage('O email deve ser informado!')
		.isEmail()
		.withMessage('O texto deve ter formato de email'),
	body('password')
		.notEmpty()
		.withMessage('O password não foi informado!')
		.isString()
		.withMessage('O tipo de dados do password deve ser um texto!'),
	validationResult(),
]

export { loginValidator }
