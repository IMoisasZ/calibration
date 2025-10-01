import { param, body, query } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

const calibrationBodyValidator = [
	body('equipment_id')
		.notEmpty()
		.withMessage('Equipamento não informado!')
		.isNumeric()
		.withMessage('O tipo de dados do equipamento deve ser numerico!'),
	body('calibration_date')
		.notEmpty()
		.withMessage('Data da calibração não informada!')
		.isDate()
		.withMessage('O tipo de dados da data da calibração é de data!'),
	body('next_calibration')
		.isDate()
		.withMessage('O tipo de dados da proxima calibração é de data!'),
	body('certificate_number')
		.notEmpty()
		.withMessage('Numero do certificado não informado!')
		.isString()
		.withMessage('O tipo de dados do numero do certificado é texto!'),
	body('calibration_status')
		.isString()
		.withMessage('O tipo de dados do status do certificado é texto! ')
		.isIn(['EM ANALISE', 'APROVADO', 'REPROVADO'])
		.withMessage(
			'O status deve ser uma das opções: "EM ANALISE", "APROVADO" ou "REPROVADO"'
		),
]

const calibrationBodyAnalysisValidator = [
	body('is_analysis')
		.notEmpty()
		.withMessage('Analise não informada!')
		.isBoolean()
		.withMessage('O tipo de dados da analise é boleano! '),
]

const calibrationParamValidator = [
	param('id')
		.notEmpty()
		.withMessage('ID não informado!')
		.isNumeric()
		.withMessage('O tipo de dados do ID é numero!'),
]

const calibrationQueryCalibration = [
	query('status')
		.notEmpty()
		.withMessage('Status da calibração não informado!')
		.isString()
		.withMessage('O tipo de dados do status da calibração é texto!')
		.isIn(['EM ANALISE', 'APROVADO', 'REPROVADO'])
		.withMessage(
			'O status deve ser uma das opções: "EM ANALISE", "APROVADO" ou "REPROVADO"'
		),
]

const createCalibrationValidator = [
	...calibrationBodyValidator,
	validationResult(),
]

const updateCalibrationValidator = [
	...calibrationParamValidator,
	...calibrationBodyValidator,
	validationResult(),
]

const getAllCalibrationsValidator = [
	...calibrationQueryCalibration,
	validationResult(),
]

const getCalibrationValidator = [
	...calibrationParamValidator,
	validationResult(),
]

const deleteCalibrationValidator = [
	...calibrationParamValidator,
	validationResult(),
]

const patchCalibrationByCalibrationAnalysis = [
	...calibrationParamValidator,
	...calibrationBodyAnalysisValidator,
	validationResult(),
]

export {
	createCalibrationValidator,
	updateCalibrationValidator,
	getAllCalibrationsValidator,
	getCalibrationValidator,
	deleteCalibrationValidator,
	patchCalibrationByCalibrationAnalysis,
}
