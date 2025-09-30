export function createCalibrationAnalysisDefinitionValidator(
	dataCalibrationAnalysisDefinition
) {
	if (!dataCalibrationAnalysisDefinition) {
		throw new Error(`Dados não informados!`)
	}

	const { calibration_id, original_status, decision_status, user_id, notes } =
		dataCalibrationAnalysisDefinition

	if (
		!calibration_id ||
		typeof calibration_id !== 'number' ||
		!Number.isInteger(calibration_id)
	) {
		throw new Error(
			`Id da calibração deve ser informado e deve ser um numero inteiro!`
		)
	}

	if (
		!original_status ||
		original_status.trim() === '' ||
		typeof original_status !== 'string'
	) {
		throw new Error(`O status original deve ser informado!`)
	}

	if (
		!decision_status ||
		decision_status.trim() === '' ||
		typeof decision_status !== 'string'
	) {
		throw new Error(`O novo status deve ser informado!`)
	}

	if (
		!user_id ||
		typeof user_id !== 'number' ||
		!Number.isInteger(user_id || user_id <= 0)
	) {
		throw new Error(
			`O usuário deve ser informado, deve ser um numeor inteiro e maior que 0!`
		)
	}

	if (
		!notes ||
		notes.trim() === '' ||
		typeof notes !== 'string' ||
		notes.length < 15 ||
		notes.length > 500
	) {
		throw new Error(
			`A analise da calibração deve ser informada, deve ser um texto, deve ter no minimo 15 e no maximo 500 caracteres!`
		)
	}

	return true
}
