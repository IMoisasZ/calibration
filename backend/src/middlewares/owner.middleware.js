import { param, body, query } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

const ownerBodyValidator = [
	body('owner')
		.notEmpty()
		.withMessage('Proprietario não informado!')
		.isString()
		.withMessage('O tipo de dados deve ser texto!'),
	body('localization_id')
		.notEmpty()
		.withMessage('Localização não informada!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico!'),
]

const ownerBodyActiveValidator = [
	body('active')
		.notEmpty()
		.withMessage('Proprietario não informado!')
		.isBoolean()
		.withMessage('O tipo de dados deve ser boolean!'),
]

const ownerParamValidator = [
	param('id')
		.notEmpty()
		.withMessage('ID não informado!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico!'),
]

const ownerQueryValidator = [
	query('status')
		.notEmpty()
		.withMessage('Status não informado!')
		.isString()
		.withMessage('O tipo de dados deve ser texto!'),
]

const createOwnerValidator = [...ownerBodyValidator, validationResult()]

const updateOwnerValidator = [
	...ownerParamValidator,
	...ownerBodyValidator,
	validationResult(),
]

const getAllOwnerValidator = [...ownerQueryValidator, validationResult()]

const getOwnerValidator = [...ownerParamValidator, validationResult()]

const updateOwnerStatusValidator = [
	...ownerParamValidator,
	...ownerBodyActiveValidator,
	validationResult(),
]

export {
	createOwnerValidator,
	updateOwnerValidator,
	getAllOwnerValidator,
	getOwnerValidator,
	updateOwnerStatusValidator,
}
