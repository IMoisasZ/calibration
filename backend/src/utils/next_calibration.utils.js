import { BadRequestError } from '../errors/customErrors.error.js'

/**
 * @param {Date | string} startDate - A data a partir da qual o cálculo será feito.
 * @param {number} daysToAdd - O número de dias a ser adicionado.
 * @returns {Date} A nova data calculada.
 */
export function nextCalibration(startDate, daysToAdd) {
	if (!startDate || !daysToAdd) {
		throw new BadRequestError(
			`A data inicial e os dias para acrescentar, são obrigatórios!`
		)
	}

	const newDate = new Date(startDate)

	newDate.setDate(newDate.getDate() + Number(daysToAdd))

	return newDate
}
