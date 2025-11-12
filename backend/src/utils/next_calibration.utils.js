/** @format */

/**
 * @fileoverview Utility function for calculating the date of the next calibration based on a start date and periodicity in days.
 * This version includes robust validation for both the presence and the validity of the date input.
 *
 * @module DateCalculationUtils
 * @requires BadRequestError
 * @requires i18n
 */
import { BadRequestError } from '../errors/customErrors.error.js'
import i18n from '../config/i18n.config.js'

/**
 * Calculates the date of the next calibration by adding a specified number of days to a starting date.
 *
 * @param {Date | string} startDate - The date from which the calculation will be made (e.g., last calibration date).
 * @param {number} daysToAdd - The number of days to be added (the calibration periodicity).
 * @returns {Date} The newly calculated date for the next calibration.
 * @throws {BadRequestError} If startDate or daysToAdd is missing, or if startDate is an invalid date format.
 */
export function nextCalibration(startDate, daysToAdd) {
	if (!startDate || !daysToAdd) {
		throw new BadRequestError(
			i18n.__('VALIDATION.UTILS.NEXT_CALIBRATION.BAD_REQUEST_INITIAL_DATE')
		)
	}

	// Attempt to create a Date object from the input.
	const newDate = new Date(startDate)

	// Robust validation: Check if the created date object is valid (i.e., not "Invalid Date").
	if (isNaN(newDate.getTime())) {
		throw new BadRequestError(
			i18n.__('VALIDATION.UTILS.NEXT_CALIBRATION.BAD_REQUEST_CREATED_DATE')
		)
	}

	// Add the days to the current date. The Date object automatically handles month/year rollovers.
	newDate.setDate(newDate.getDate() + Number(daysToAdd))

	return newDate
}
