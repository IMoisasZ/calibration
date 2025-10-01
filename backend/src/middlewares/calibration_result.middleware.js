/** @format */

import { param, body } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

const calibrationResultBodyValidator = [
	body('calibration_id')
		.notEmpty()
		.withMessage('Calibração ID não informada!')
		.isNumeric()
		.withMessage('Tipo de dados da calibração ID é numerico!'),
	body('factor_id')
		.notEmpty()
		.withMessage('Fator ID não informado!')
		.isInt()
		.withMessage('Tipo de dados do factor_id deve ser um numero inteiro!'),
	body('measuring_range')
		.notEmpty()
		.withMessage('Faixa de medição não informada!')
		.isString()
		.withMessage('Tipo de dados da faixa de medição é texto!'),
	body('optimal_resolution')
		.optional()
		.isNumeric()
		.withMessage('Tipo de dados da resolução ideal é numerico!'),
	body('identifier')
		.notEmpty()
		.withMessage('Identificação não informada!')
		.isBoolean()
		.withMessage('Tipo de dados da identificação é boleano!'),
	body('environmental_conditions')
		.notEmpty()
		.withMessage('Condições ambientais não informada!')
		.isBoolean()
		.withMessage('Tipo de dados da condições ambientais é boleano!'),
	body('biggest_deviation')
		.optional()
		.isNumeric()
		.withMessage('Tipo de dados do maior desvio é numerico!'),
	body('measurement_uncertainty')
		.optional()
		.isNumeric()
		.withMessage('Tipo de dados da incerteza da medição é numerico!'),
	body('biggest_deviation_plus_measurement_uncertainty')
		.optional()
		.isNumeric()
		.withMessage(
			'Tipo de dados do maior desvio + incerteza da medição é numerico!'
		),
	body('status_result')
		.optional()
		.isString()
		.withMessage('Tipo de dados do status do resultado da calibração é texto!')
		.isIn(['APROVADO', 'REPROVADO'])
		.withMessage('Informe apenas: "APROVADO" ou "REPROVADO"'),
]

const calibrationResultBodyStatusResultValidator = [
	body('status_result')
		.notEmpty()
		.withMessage('Status do resultado da calibração não informado!')
		.isString()
		.withMessage(
			'O tipo de dados do do status do resultado da calibração é texto!'
		),
]

const calibrationResultParamIDValidator = [
	param('id')
		.notEmpty()
		.withMessage('ID não informado!')
		.isNumeric()
		.withMessage('O tipo de dados do ID é numerico!'),
]

const calibrationResultParamCalibrationIDValidator = [
	param('calibration_id')
		.notEmpty()
		.withMessage('ID da calibração não informado!')
		.isNumeric()
		.withMessage('O tipo de dados do ID da calibração é numerico!'),
]

const createCalibrationResultValidator = [
	...calibrationResultBodyValidator,
	validationResult(),
]

const updateCalibrationResultValidator = [
	...calibrationResultParamIDValidator,
	...calibrationResultBodyValidator,
	validationResult(),
]

const getAllCalibrationResultByCalibrationIdValidator = [
	...calibrationResultParamCalibrationIDValidator,
	validationResult(),
]

const getCalibrationResultValidator = [
	...calibrationResultParamIDValidator,
	validationResult(),
]

const updateCalibrationResultStatusValidator = [
	...calibrationResultParamIDValidator,
	...calibrationResultBodyStatusResultValidator,
	validationResult(),
]

const deleteCalibrationResultValidator = [
	...calibrationResultParamIDValidator,
	validationResult(),
]

export {
	createCalibrationResultValidator,
	updateCalibrationResultValidator,
	getAllCalibrationResultByCalibrationIdValidator,
	getCalibrationResultValidator,
	updateCalibrationResultStatusValidator,
	deleteCalibrationResultValidator,
}
