import CalibrationAnalysisRepository from '../repositories/calibration_analysis.repository.js'
import { BadRequestError } from '../errors/customErrors.error.js'

async function createCalibrationAnalysis(calibrationAnalysis) {
	if (!calibrationAnalysis || Object.keys(calibrationAnalysis).length === 0) {
		throw new BadRequestError(
			`Informações sobre a analise da calibração não informado!`
		)
	}

	if (calibrationAnalysis.notes.length < 15) {
		throw new BadRequestError(
			'As notas da análise são obrigatórias e devem ter no mínimo 15 caracteres para uma justificativa adequada.'
		)
	}

	return await CalibrationAnalysisRepository.createCalibrationAnalysis(
		calibrationAnalysis
	)
}

export default { createCalibrationAnalysis }
