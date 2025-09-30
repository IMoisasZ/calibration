import { query, param, body } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

const equipmentTypeBodyValidator = [
	body('equipment_type')
		.notEmpty()
		.withMessage('Tipo de de equipamento não informado!')
		.isString()
		.withMessage('O tipo de dados deve ser texto!'),
]

const equipmentTypeParamValidator = [
	param('id')
		.notEmpty()
		.withMessage('Id não informado!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico!'),
]

const equipmentTypeQueryValidator = [
	query('status')
		.notEmpty()
		.withMessage('Status não informado!')
		.isString()
		.withMessage('O tipo de dados deve ser texto'),
]

const equipmentTypeBodyActiveValidator = [
	body('active')
		.notEmpty()
		.withMessage('Active não informado')
		.isBoolean()
		.withMessage('O tipo de dados de ser boolean'),
]

const createEquipmentTypeValidator = [
	...equipmentTypeBodyValidator,
	...equipmentTypeBodyActiveValidator,
	validationResult(),
]

const updateEquipmentTypeValidator = [
	...equipmentTypeParamValidator,
	...equipmentTypeBodyValidator,
	...equipmentTypeBodyActiveValidator,
	validationResult(),
]

const getAllEquipmentTypeValidator = [
	...equipmentTypeQueryValidator,
	validationResult(),
]

const getEquipmentTypeValidator = [
	...equipmentTypeParamValidator,
	validationResult(),
]

const updateEquipmentTypeStatusValidator = [
	...equipmentTypeParamValidator,
	...equipmentTypeBodyActiveValidator,
	validationResult(),
]

export {
	createEquipmentTypeValidator,
	updateEquipmentTypeValidator,
	getAllEquipmentTypeValidator,
	getEquipmentTypeValidator,
	updateEquipmentTypeStatusValidator,
}
