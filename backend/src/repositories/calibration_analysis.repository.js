/** @format */

import { CalibrationModel } from '../models/__index.js'
import dbConnection from '../connection/db.connection.js'
import CalibrationAnalysis from '../models/calibration_analysis.model.js'

/**
 * @typedef {import('sequelize').Model} CalibrationModelInstance
 * @typedef {import('sequelize').Model} CalibrationAnalysisInstance
 * @typedef {object} CalibrationAnalysisPayload
 * @property {number} calibration_id - The ID of the parent Calibration record to link and update.
 * @property {string} original_status - The status before final analysis (e.g., 'EM ANALISE').
 * @property {string} decision_status - The final approved status (e.g., 'APROVADO CONDICIONAL').
 * @property {number} user_id - The ID of the User who performed the analysis.
 * @property {string} notes - Justification notes for the decision.
 * // ... other properties from the CalibrationAnalysis model
 */

/**
 * Creates a new Calibration Analysis record and atomically updates the parent Calibration record.
 * This operation is critical for workflow integrity and is wrapped in a Sequelize transaction.
 *
 * @async
 * @param {CalibrationAnalysisPayload} calibrationAnalysis - The data payload for the new analysis record.
 * @returns {Promise<{success: boolean, message: string}>} An object indicating the success of the transaction and a status message.
 * @throws {Error} Throws an error with a generalized message if the transaction fails, ensuring a rollback occurs.
 */
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

/**
 * @module CalibrationAnalysisRepository
 * @description Repository for handling transactional operations related to the final analysis of calibration events.
 */
export default { createCalibrationAnalysis }
