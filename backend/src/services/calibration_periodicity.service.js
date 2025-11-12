/** @format */

import CalibrationPeriodicityRepository from '../repositories/calibration_periodicity.repository.js'
import {
	BadRequestError,
	NotFoundError,
	AlreadyAdded,
} from '../errors/customErrors.error.js'
import { UniqueConstraintError } from 'sequelize'
import i18n from '../config/i18n.config.js'

/**
 * @typedef {object} CalibrationPeriodicityData
 * @property {string} description - The descriptive name of the calibration periodicity (e.g., 'ANNUAL', 'SEMIANNUAL'). Must be unique.
 * @property {number} calibration_days - The number of days for this periodicity interval.
 * @property {boolean} [active=true] - Status indicating if the periodicity option is active.
 */

/**
 * Internal function to check if a Calibration Periodicity record exists by its ID.
 * Throws specific, internationalized errors if the ID is missing or the record is not found.
 *
 * @async
 * @param {number} id - The ID of the Calibration Periodicity record to check.
 * @returns {Promise<import('../repositories/calibration_periodicity.repository.js').CalibrationPeriodicityInstance>} A promise that resolves to the found Calibration Periodicity instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If no record is found with the given ID.
 */

async function existCalibrationRepositoryById(id) {
	if (!id) {
		throw new BadRequestError(
			i18n.__('VALIDATION.SERVICES.CALIBRATION_PERIODICITY.ID_NOT_PROVIDE')
		)
	}

	const calibrationPeriodicity =
		await CalibrationPeriodicityRepository.getCalibrationPeriodicity(id)
	if (!calibrationPeriodicity) {
		throw new NotFoundError(
			i18n.__(
				'VALIDATION.SERVICES.CALIBRATION_PERIODICITY.CALIBRATION_PERIODICITY_NOT_FOUND'
			)
		)
	}

	return calibrationPeriodicity
}

/**
 * Creates a new Calibration Periodicity record.
 * Handles Sequelize's UniqueConstraintError by throwing a custom AlreadyAdded error with an internationalized message.
 *
 * @async
 * @param {CalibrationPeriodicityData} calibrationPeriodicity - The data payload for the new periodicity.
 * @returns {Promise<import('../repositories/calibration_periodicity.repository.js').CalibrationPeriodicityInstance>} The newly created Calibration Periodicity instance.
 * @throws {AlreadyAdded} If a record with the same unique constraint (e.g., description) already exists.
 * @throws {Error} Propagates other errors.
 */
async function createCalibrationPeriodicity(calibrationPeriodicity) {
	try {
		return await CalibrationPeriodicityRepository.createCalibrationPeriodicity(
			calibrationPeriodicity
		)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.CALIBRATION_PERIODICITY.CALIBRATION_PERIODICITY_ALREADY_ADDED'
				)
			)
		}
		throw error
	}
}

/**
 * Updates an existing Calibration Periodicity record by ID.
 * Ensures the record exists before attempting the update. Handles unique constraint errors.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {CalibrationPeriodicityData} calibrationPeriodicity - The updated data payload.
 * @returns {Promise<import('../repositories/calibration_periodicity.repository.js').CalibrationPeriodicityInstance>} The updated Calibration Periodicity instance.
 * @throws {NotFoundError} If the record does not exist.
 * @throws {AlreadyAdded} If the update causes a unique constraint violation.
 * @throws {Error} Propagates other errors.
 */
async function updateCalibrationPeriodicity(id, calibrationPeriodicity) {
	await existCalibrationRepositoryById(id)
	try {
		return await CalibrationPeriodicityRepository.updateCalibrationPeriodicity(
			id,
			calibrationPeriodicity
		)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				i18n.__(
					'VALIDATION.SERVICES.CALIBRATION_PERIODICITY.CALIBRATION_PERIODICITY_ALREADY_ADDED'
				)
			)
		}
		throw error
	}
}

/**
 * Retrieves all Calibration Periodicity records.
 * Allows optional filtering to return only active records.
 *
 * @async
 * @param {string} status - If the string value is 'true', only returns records where `active: true`.
 * @returns {Promise<Array<import('../repositories/calibration_periodicity.repository.js').CalibrationPeriodicityInstance>>} An array of Calibration Periodicity instances.
 */
async function getAllCalibrationPeriodicity(status) {
	if (status === 'true') {
		return await CalibrationPeriodicityRepository.getAllCalibrationPeriodicity({
			active: true,
		})
	}
	return await CalibrationPeriodicityRepository.getAllCalibrationPeriodicity({})
}

/**
 * Finds a single Calibration Periodicity record by its primary key (ID).
 * Leverages `existCalibrationRepositoryById` to ensure the record is found or an error is thrown.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @returns {Promise<import('../repositories/calibration_periodicity.repository.js').CalibrationPeriodicityInstance>} The found Calibration Periodicity instance.
 * @throws {BadRequestError} If the ID is not provided.
 * @throws {NotFoundError} If the record does not exist.
 */
async function getCalibrationPeriodicity(id) {
	return await existCalibrationRepositoryById(id)
}

/**
 * Updates only the 'active' status flag of a Calibration Periodicity record.
 * Ensures the record exists before attempting the status update.
 *
 * @async
 * @param {number} id - The ID of the record to update.
 * @param {boolean} active - The new status (true for active, false for inactive).
 * @returns {Promise<import('../repositories/calibration_periodicity.repository.js').CalibrationPeriodicityInstance>} The updated Calibration Periodicity instance.
 * @throws {NotFoundError} If the record does not exist.
 */
async function updateCalibrationPeriodicityStatus(id, active) {
	await existCalibrationRepositoryById(id)
	return await CalibrationPeriodicityRepository.updateCalibrationPeriodicityStatus(
		id,
		active
	)
}

export default {
	createCalibrationPeriodicity,
	updateCalibrationPeriodicity,
	getAllCalibrationPeriodicity,
	getCalibrationPeriodicity,
	updateCalibrationPeriodicityStatus,
}
