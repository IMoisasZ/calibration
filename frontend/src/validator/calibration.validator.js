function createUpdateCalibrationValidator(dataCalibration) {
	const { calibrationData, calibrationResults } = dataCalibration

	if (!dataCalibration) {
		throw new Error('Dados não informados!')
	}
	if (!calibrationData.equipment_id) {
		throw new Error('O equipamento é obrigatório!')
	}
	if (!new Date(calibrationData.calibration_date)) {
		throw new Error('A data da calibração é obrigatória!')
	}
	if (!new Date(calibrationData.next_calibration)) {
		throw new Error('A proxima data da calibração é obrigatória!')
	}
	if (
		!calibrationData.certificate_number ||
		calibrationData.certificate_number.trim() === ''
	) {
		throw new Error('O numero do certificado é obrigatório!')
	}

	calibrationResults.map((item) => {
		if (!item.measuring_range || item.measuring_range.trim() === '') {
			throw new Error('A faixa de medição é obrigatória!')
		}

		if (!item.biggest_deviation) {
			throw new Error('O maior desvio é obrigatória!')
		}

		if (!item.measurement_uncertainty) {
			throw new Error('A inderteza da medição é obrigatória!')
		}
	})

	return true
}

function factorValidator(factorData) {
	console.log(factorData)

	if (!Array.isArray(factorData)) {
		throw new Error('Dados informados incorretamente!')
	}

	if (factorData.length === 0) {
		throw new Error('Não há dados para apresentar!')
	}

	if (!factorData[0].factor) {
		throw new Error(`Fator não inexistente!`)
	}

	if (factorData[0].factor === 0) {
		throw new Error('O fator não pode ser 0!')
	}

	return true
}

export { createUpdateCalibrationValidator, factorValidator }
