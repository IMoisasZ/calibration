/** @format */

/**
 * @fileoverview Utility functions for performing standard calculations related to calibration analysis,
 * such as determining optimal resolution and final status (Approved/Reproved).
 *
 * @module CalibrationResultUtils
 * @requires BadRequestError
 * @requires i18n
 */
import { BadRequestError } from '../errors/customErrors.error.js'
import i18n from '../config/i18n.config.js'

/**
 * Calculates the optimal resolution, usually defined as the Acceptance Criteria divided by 2.
 *
 * @param {number} acceptance_criteria - The maximum permissible error (MPE) or acceptance range. Must be a non-zero number.
 * @param {number} [value=2] - The divisor used for the calculation (default is 2).
 * @returns {number} The calculated optimal resolution value.
 * @throws {BadRequestError} If acceptance_criteria is not a valid number or is zero.
 */
export function optimalResolution(acceptance_criteria, value = 2) {
	if (
		typeof acceptance_criteria !== 'number' ||
		isNaN(acceptance_criteria) ||
		acceptance_criteria === 0
	) {
		throw new BadRequestError(
			i18n.__(
				'VALIDATION.UTILS.CALIBRATION_RESULT.BAD_REQUEST_ACCEPTANCE_CRITERIA'
			)
		)
	}
	return acceptance_criteria / value
}

/**
 * Calculates the sum of the biggest deviation observed during calibration and the measurement uncertainty.
 *
 * @param {number|string} biggest_deviation - The largest observed deviation value.
 * @param {number|string} measurement_uncertainty - The uncertainty value calculated for the measurement.
 * @returns {number} The sum of the deviation and uncertainty.
 * @throws {BadRequestError} If either input cannot be converted to a valid number.
 */
export function biggestDeviationPlusMeasurementUncertainty(
	biggest_deviation,
	measurement_uncertainty
) {
	const deviation = Number(biggest_deviation)
	const uncertainty = Number(measurement_uncertainty)

	if (isNaN(deviation) || isNaN(uncertainty)) {
		throw new BadRequestError(
			i18n.__(
				'VALIDATION.UTILS.CALIBRATION_RESULT.BAD_REQUEST_MEASUREMENT_UNCERTAINTY'
			)
		)
	}

	return deviation + uncertainty
}

/**
 * Determines the final status of a calibration result based on the comparison between
 * (Biggest Deviation + Measurement Uncertainty) and the Optimal Resolution (Acceptance Criteria / 2).
 *
 * @param {number} acceptance_criteria - The maximum permissible error (MPE).
 * @param {number} biggest_deviation - The largest observed deviation.
 * @param {number} measurement_uncertainty - The calculated measurement uncertainty.
 * @returns {'APROVADO' | 'REPROVADO'} The final status.
 */
export function statusResult(
	acceptance_criteria,
	biggest_deviation,
	measurement_uncertainty
) {
	// These internal calls will handle input validation and throw BadRequestError if necessary
	const optimal_resolution_value = optimalResolution(acceptance_criteria)
	const sum_deviation_uncertainty = biggestDeviationPlusMeasurementUncertainty(
		biggest_deviation,
		measurement_uncertainty
	)

	// Decision Logic: If the total combined error (sum_deviation_uncertainty) is less than or equal to
	// the optimal resolution, the result is APROVADO (Approved).
	const status =
		sum_deviation_uncertainty <= optimal_resolution_value
			? 'APROVADO'
			: 'REPROVADO'

	return status
}
