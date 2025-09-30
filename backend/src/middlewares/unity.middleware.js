import { param, body, query } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

const unityBodyValidator = [
	body('description')
		.notEmpty()
		.withMessage('Descrição não informada!')
		.isString()
		.withMessage('O tipo de dados deve ser texto!'),
	body('tag')
		.notEmpty()
		.withMessage('Descrição não informada!')
		.isString()
		.withMessage('O tipo de dados deve ser texto!'),
	body('active')
		.notEmpty()
		.withMessage('Ativo não informado!')
		.isBoolean()
		.withMessage('O tipo de dados deve ser boolean!'),
]

const unityBodyActiveValidator = [
	body('active')
		.notEmpty()
		.withMessage('Ativo não informado!')
		.isBoolean()
		.withMessage('O tipo de dados deve ser boolean!'),
]

const unityParamValidator = [
	param('id')
		.notEmpty()
		.withMessage('ID não informado!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico!'),
]

const unityQueryValidator = [
	query('status')
		.notEmpty()
		.withMessage('Status não informado!')
		.isString()
		.withMessage('O tipo de dados deve ser texto!'),
]

const createUnityValidator = [...unityBodyValidator, validationResult()]

const updateUnityValidator = [
	...unityParamValidator,
	...unityBodyValidator,
	validationResult(),
]

const getAllUnityValidator = [...unityQueryValidator, validationResult()]

const getUnityValidator = [...unityParamValidator, validationResult()]

const updateUnityStatusValidator = [
	...unityParamValidator,
	...unityBodyActiveValidator,
	validationResult(),
]

export {
	createUnityValidator,
	updateUnityValidator,
	getAllUnityValidator,
	getUnityValidator,
	updateUnityStatusValidator,
}
