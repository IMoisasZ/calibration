/** @format */

import CalibrationConfigService from '../services/calibration_config.service.js'

const pathName = '/calibration_config'

/**
 * @module CalibrationConfigController
 * @description Controller layer for managing Calibration Configuration records.
 * This entity stores factors and parameters used in the calibration process,
 * typically ensuring only one record is marked as 'actual' (active) at a time.
 */

/**
 * @typedef {object} CalibrationConfigPayload
 * @property {number} factor - The numeric calibration factor to be applied.
 * @property {boolean} [actual=true] - Indicates if this is the currently active configuration.
 */

/**
 * Handles the creation of a new Calibration Configuration.
 * This operation typically involves updating all existing configurations to set their 'actual' status to false
 * before creating the new one with 'actual' status set to true (business logic delegated to the service).
 *
 * @async
 * @function updateCalibrationConfigToNoActualAndCreate
 * @param {import('express').Request<{}, {}, CalibrationConfigPayload>} req - Express Request object containing the new calibration configuration data.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 201 status response with the newly created configuration.
 */
async function updateCalibrationConfigToNoActualAndCreate(req, res, next) {
	try {
		const calibrationConfig = req.body
		const newCalibrationConfig =
			await CalibrationConfigService.updateCalibrationConfigToNoActualAndCreate(
				calibrationConfig
			)
		res.status(201).send(newCalibrationConfig)
		const loggerMessage = `POST - ${pathName} - ${JSON.stringify(
			newCalibrationConfig.id
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a list of all Calibration Configuration records.
 * Optionally allows filtering to retrieve only the currently 'actual' (active) configuration.
 *
 * @async
 * @function getAllCalibrationConfig
 * @param {import('express').Request<{}, {}, {}, {actual: string}>} req - Express Request object, including the optional 'actual' query parameter.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the list of configurations.
 */
async function getAllCalibrationConfig(req, res, next) {
	try {
		const { actual } = req.query
		const calibrationConfig =
			await CalibrationConfigService.getAllCalibrationConfig(actual)
		res.status(200).send(calibrationConfig)
		const loggerMessage = `GET - ${pathName}?actual=${actual}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

/**
 * Retrieves a single Calibration Configuration record by its ID.
 *
 * @async
 * @function getCalibrationConfig
 * @param {import('express').Request<{id: number}>} req - Express Request object, including the ID in the URL parameters.
 * @param {import('express').Response} res - Express Response object.
 * @param {import('express').NextFunction} next - Callback function to pass errors to the middleware.
 * @returns {Promise<void>} Sends a 200 status response with the found configuration.
 */
async function getCalibrationConfig(req, res, next) {
	try {
		const { id } = req.params
		const calibrationConfig =
			await CalibrationConfigService.getCalibrationConfig(id)
		res.status(200).send(calibrationConfig)
		const loggerMessage = `GET - ${pathName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	updateCalibrationConfigToNoActualAndCreate,
	getAllCalibrationConfig,
	getCalibrationConfig,
}
