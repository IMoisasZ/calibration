import { BadRequestError } from '../errors/customErrors.error.js'

export function optimalResolution(acceptance_criteria, value = 2) {
	if (
		typeof acceptance_criteria !== 'number' ||
		isNaN(acceptance_criteria || acceptance_criteria === 0)
	) {
		throw new BadRequestError(
			`Critério de aceitação deve ser um número e não pode ser 0!`
		)
	}
	return acceptance_criteria / value
}

export function biggestDeviationPlusMeasurementUncertainty(
	biggest_deviation,
	measurement_uncertainty
) {
	const deviation = Number(biggest_deviation)
	const uncertainty = Number(measurement_uncertainty)

	if (isNaN(deviation) || isNaN(uncertainty)) {
		throw new BadRequestError(
			`Desvio e incerteza de medição devem ser valores numéricos!`
		)
	}

	return deviation + uncertainty
}

export function statusResult(
	acceptance_criteria,
	biggest_deviation,
	measurement_uncertainty
) {
	const optimal_resolution_value = optimalResolution(acceptance_criteria)
	const sum_deviation_uncertainty = biggestDeviationPlusMeasurementUncertainty(
		biggest_deviation,
		measurement_uncertainty
	)

	const status =
		sum_deviation_uncertainty <= optimal_resolution_value
			? 'APROVADO'
			: 'REPROVADO'

	return status
}
