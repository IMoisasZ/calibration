import { query, param, body } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

const equipmentBodyValidator = [
	body('description')
		.notEmpty()
		.withMessage('Descrição não informada!')
		.isString()
		.withMessage('O tipo de dados deve ser um texto!'),
	body('owner_id')
		.notEmpty()
		.withMessage('Proprietário não informado!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser um numerico!'),
	body('identifier')
		.notEmpty()
		.withMessage('Identificação não informada!')
		.isString()
		.withMessage('O tipo de dados deve ser texto!'),
	body('division')
		.notEmpty()
		.withMessage('Divisão não informada!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico!'),
	body('unity_id')
		.notEmpty()
		.withMessage('Unidade de medida não informada!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico!'),
	body('min_capacity')
		.notEmpty()
		.withMessage('Capacidade minima não informada!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico!'),
	body('max_capacity')
		.notEmpty()
		.withMessage('Capacidade maxima não informada!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico!'),
	body('acceptance_criteria')
		.notEmpty()
		.withMessage('Critério de aceitação não informado!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico!'),
	body('calibration_periodicity_id')
		.notEmpty()
		.withMessage('Periodicidade não informda!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico!'),
	body('active')
		.notEmpty()
		.withMessage('Campo não informado!')
		.isBoolean()
		.withMessage('O tipo de dados deve ser true ou false'),
]

const equipmentActiveValidator = [
	body('active')
		.notEmpty()
		.withMessage('Campo não informado!')
		.isBoolean()
		.withMessage('O tipo de dados deve ser true ou false'),
]

const equipmentParamValidator = [
	param('id')
		.notEmpty()
		.withMessage('ID não informado!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico!'),
]

const equipmentQueryValidator = [
	query('status')
		.notEmpty()
		.withMessage('Status não informado!')
		.isString()
		.withMessage('O tipo de dados deve ser texto!'),
]

const createEquipmentValidator = [...equipmentBodyValidator, validationResult()]

const updateEquipmentValidator = [
	...equipmentParamValidator,
	...equipmentBodyValidator,
	validationResult(),
]

const getAllEquipmentValidator = [
	...equipmentQueryValidator,
	validationResult(),
]

const getEquipmentValidator = [...equipmentParamValidator, validationResult()]

const getEquipmentByIdentifierValidator = [
	param('identifier')
		.notEmpty()
		.withMessage('Identificador não informado!')
		.isString()
		.withMessage('O tipo de dados deve ser texto!'),
	validationResult(),
]

const updateEquipmentStatus = [
	...equipmentParamValidator,
	...equipmentActiveValidator,
	validationResult(),
]

export {
	createEquipmentValidator,
	updateEquipmentValidator,
	getAllEquipmentValidator,
	getEquipmentValidator,
	getEquipmentByIdentifierValidator,
	updateEquipmentStatus,
}
