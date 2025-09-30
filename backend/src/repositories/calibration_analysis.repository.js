import {
	CalibrationAnalysisModel,
	CalibrationModel,
} from '../models/__index.js'
import dbConnection from '../connection/db.connection.js'
import CalibrationAnalysis from '../models/calibration_analysis.model.js'

async function createCalibrationAnalysis(calibrationAnalysis) {
	const t = await dbConnection.transaction()
	try {
		const { calibration_id, ...data } = calibrationAnalysis

		await CalibrationAnalysis.create(
			{
				...data,
				calibration_id: calibration_id,
			},
			{ transaction: t }
		)

		await CalibrationModel.update(
			{ is_analysis: true },
			{
				where: {
					id: calibration_id,
				},
				transaction: t,
			}
		)

		await t.commit()

		return {
			success: true,
			message: 'Análise e status da calibração atualizados com sucesso.',
		}
	} catch (error) {
		// 5. Se qualquer passo falhou, efetua o rollback
		await t.rollback()
		console.error('Erro na transação de análise de calibração:', error)

		// Propaga o erro para ser tratado no controller/frontend
		throw new Error(
			'Falha ao processar a análise. Nenhuma alteração foi salva.'
		)
	}
}

export default { createCalibrationAnalysis }
