export function createCalibrationConfigFactor(calibrationConfig) {
	if (!calibrationConfig) {
		throw new Error(`Dados não informados!`)
	}

	if (!calibrationConfig.factor) {
		throw new Error('Fator não informado!')
	}

	if (
		typeof calibrationConfig.factor !== 'number' ||
		!Number.isInteger(calibrationConfig.factor) ||
		calibrationConfig.factor <= 0
	) {
		throw new Error(`O fator deve ser um numero inteiro e positivo`)
	}

	return true
}
