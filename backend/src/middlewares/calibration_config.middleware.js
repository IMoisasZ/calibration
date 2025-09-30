import { body, query, param } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

const calibrationConfigBodyValidator = [
	body('factor')
		.notEmpty()
		.withMessage('Fator não informado!')
		.isInt({ min: 1 })
		.withMessage('O tipo de dados do factor deve ser inteiro e positivo!'),
]

const calibrationConfigQueryValidator = [
	query('actual')
		.exists()
		.withMessage('O parametro "actual" não foi informado na consulta!')
		.isString()
		.withMessage('O tipo de dados do "actual" deve ser um texto!')
		.isIn(['true', 'false'])
		.withMessage('O valor do "actual" deve ser "true" ou "false"'),
]

const calibrationConfigParamValidator = [
	param('id')
		.notEmpty()
		.withMessage('ID não informado!')
		.isNumeric()
		.withMessage('O tipo de dados do id deve ser numerico!'),
]

const updateCalibrationConfigToNoActualAndCreateValidator = [
	...calibrationConfigBodyValidator,
	validationResult(),
]

const getAllCalibrationConfigValidator = [
	...calibrationConfigQueryValidator,
	validationResult(),
]

const getCalibrationConfigValidator = [
	...calibrationConfigParamValidator,
	validationResult(),
]

export {
	updateCalibrationConfigToNoActualAndCreateValidator,
	getAllCalibrationConfigValidator,
	getCalibrationConfigValidator,
}
