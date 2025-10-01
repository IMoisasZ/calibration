import { body } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

const calibrationAnalysisBodyValidator = [
	body('calibration_id')
		.exists()
		.withMessage('calibration_id não informado!')
		.notEmpty()
		.withMessage('O calibration_id não pode ser nulo!')
		.isNumeric()
		.withMessage('O tipo de dados do calibration_id deve ser um numero!'),
	body('original_status')
		.exists()
		.withMessage('original_status não informado!')
		.notEmpty()
		.withMessage('O original_status não pode ser nulo!')
		.isString()
		.withMessage('O tipo de dados do original_status deve ser um texto!')
		.isIn(['EM ANALISE', 'APROVADO', 'REPROVADO'])
		.withMessage('São aceitos apenas "EM ANALISE", "APROVADO" ou "REPROVADO"!'),
	body('decision_status')
		.exists()
		.withMessage('decision_status não informado!')
		.notEmpty()
		.withMessage('O decision_status não pode ser nulo!')
		.isString()
		.withMessage('O tipo de dados do decision_status deve ser um texto!')
		.isIn(['APROVADO CONDICIONAL', 'REPROVADO'])
		.withMessage('São aceitos apenas "APROVADO CONDICIONAL" ou "REPROVADO"!'),
	body('user_id')
		.exists()
		.withMessage('user_id não informado!')
		.notEmpty()
		.withMessage('O user_id não pode ser nulo!')
		.isNumeric()
		.withMessage('O tipo de dados do user_id deve ser um numero!'),
	body('notes')
		.exists()
		.withMessage('notes não informado!')
		.notEmpty()
		.withMessage('O notes não pode ser nulo!')
		.isString()
		.withMessage('O tipo de dados do notes deve ser um texto!')
		.isLength({ min: 15, max: 500 })
		.withMessage('A quantidade minima de caracteres é 15 e o máximo é 500!'),
]

const createCalibrationAnalysisValidator = [
	...calibrationAnalysisBodyValidator,
	validationResult(),
]

export { createCalibrationAnalysisValidator }
