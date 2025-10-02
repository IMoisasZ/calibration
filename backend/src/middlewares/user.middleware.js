import { body, param, query } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

const createUserRequiredFields = [
	body(['user_name', 'email', 'password'])
		.exists()
		.withMessage('Campo obrigatório não informado!')
		.notEmpty()
		.withMessage('Campo obrigatório não pode ser vazio!'),
]

const userBodyValidator = [
	body('user_name')
		.optional()
		.isString()
		.withMessage('O tipo de dados do user_name deve ser um texto!'),
	body('email')
		.optional()
		.isString()
		.withMessage('O tipo de dados do user_name deve ser um texto!')
		.isEmail()
		.withMessage('Formado de email invalido!'),
	body('password')
		.optional()
		.isString()
		.withMessage('O tipo de dados do password deve ser um texto!')
		.isLength({ min: 6, max: 20 })
		.withMessage('A senha deve te no minimo 6 e no maximo 20 caracteres!!'),
]

const userBodyActiveValidator = [
	body('active')
		.exists()
		.withMessage('active não informado!')
		.notEmpty()
		.withMessage('Active não informado!')
		.isBoolean()
		.withMessage('O tipo de dados do active deve ser um boleano!'),
]

const userParamValidator = [
	param('id')
		.exists()
		.withMessage('id não informado!')
		.notEmpty()
		.withMessage('ID não informado!')
		.isInt()
		.withMessage('O tipo de dados do id deve ser um numero inteiro!'),
]

const userQueryValidator = [
	query('active')
		.exists()
		.withMessage('active não informado!')
		.notEmpty()
		.withMessage('Active não informado!')
		.isString()
		.withMessage('O tipo de dados do active deve ser um texto!'),
]

const userQueryEmailValidator = [
	query('email')
		.exists()
		.withMessage('email não informado!')
		.notEmpty()
		.withMessage('Email não informado!')
		.isString()
		.withMessage('O tipo de dados do email deve ser um texto!')
		.isEmail()
		.withMessage('Formado de email invalido!'),
]

const createUserValidator = [
	...createUserRequiredFields,
	...userBodyValidator,
	validationResult(),
]

const updateUserValidator = [
	...userParamValidator,
	...userBodyValidator,
	validationResult(),
]

const getAllUsersValidator = [...userQueryValidator, validationResult()]

const getUserValidator = [...userParamValidator, validationResult()]

const getUserByEmailValidator = [...userQueryEmailValidator, validationResult()]

const patchUserDisableEnableValidator = [
	...userParamValidator,
	...userBodyActiveValidator,
	validationResult(),
]

export {
	createUserValidator,
	updateUserValidator,
	getAllUsersValidator,
	getUserValidator,
	getUserByEmailValidator,
	patchUserDisableEnableValidator,
}
