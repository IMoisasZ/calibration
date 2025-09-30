import { param, body, query } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

const calibrationPeriodicityBodyValidator = [
	body('description')
		.notEmpty()
		.withMessage('Descrição não informada!')
		.isString()
		.withMessage('O tipo de dados deve ser texto!'),
	body('calibration_days')
		.notEmpty()
		.withMessage('Quantidade de dias referente a decrição, não informada!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser numerico'),
]

const calibrationPeriodicityBodyActiveValidator = [
	body('active')
		.notEmpty()
		.withMessage('Ativo não informada!')
		.isBoolean()
		.withMessage('O tipo de dados deve ser boolean!'),
]

const calibrationPeriodicityParamValidator = [
	param('id')
		.notEmpty()
		.withMessage('ID não informado!')
		.isNumeric()
		.withMessage('O tipo de dados deve ser nuerico!'),
]

const calibrationPeriodicityQueryValidator = [
	query('status')
		.notEmpty()
		.withMessage('Status não informado!')
		.isString()
		.withMessage('O tipo de dados deve ser texto!'),
]

const createCalibrationPeriodicityValidator = [
	...calibrationPeriodicityBodyValidator,
	validationResult(),
]

const updateCalibrationPeriodicityValidator = [
	...calibrationPeriodicityParamValidator,
	...calibrationPeriodicityBodyValidator,
	validationResult(),
]

const getAllCalibrationPeriodicityValidator = [
	...calibrationPeriodicityQueryValidator,
	validationResult(),
]

const getCalibrationPeriodicityValidator = [
	...calibrationPeriodicityParamValidator,
	validationResult(),
]

const updateCalibrationPeriodicityStatusValidator = [
	...calibrationPeriodicityParamValidator,
	...calibrationPeriodicityBodyActiveValidator,
	validationResult(),
]

export {
	createCalibrationPeriodicityValidator,
	updateCalibrationPeriodicityValidator,
	getAllCalibrationPeriodicityValidator,
	getCalibrationPeriodicityValidator,
	updateCalibrationPeriodicityStatusValidator,
}
