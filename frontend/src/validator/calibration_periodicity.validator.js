function createUpdateCalibrationPeriodicityValidator(
	dataCalibrationPeriodicityValidator
) {
	console.log(dataCalibrationPeriodicityValidator)

	if (!dataCalibrationPeriodicityValidator) {
		throw new Error('Dados não informados!')
	}
	if (
		!dataCalibrationPeriodicityValidator.description ||
		dataCalibrationPeriodicityValidator.description.trim() === ''
	) {
		throw new Error('A descrição é obrigatória!')
	}

	if (
		!dataCalibrationPeriodicityValidator.calibration_days ||
		Number(dataCalibrationPeriodicityValidator.calibration_days) === 0
	) {
		throw new Error('A quantidade de dias é obrigatória!')
	}
	return true
}

export { createUpdateCalibrationPeriodicityValidator }
