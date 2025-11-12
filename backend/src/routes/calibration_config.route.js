/** @format */

/**
 * @fileoverview Defines the routes for managing Calibration Configuration (CalibrationConfig) records.
 * Routes include creating a new configuration, which invalidates the current one, and retrieving configurations.
 *
 * @module CalibrationConfigRoutes
 * @requires express
 * @requires CalibrationConfigController
 * @requires calibration_config.middleware
 * @requires auth.middleware
 */
import { Router } from 'express'
import CalibrationConfigController from '../controllers/calibration_config.controller.js'
import {
	updateCalibrationConfigToNoActualAndCreateValidator,
	getAllCalibrationConfigValidator,
	getCalibrationConfigValidator,
} from '../middlewares/calibration_config.middleware.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

/**
 * @const {Router} route - Express router instance for calibration configuration.
 */
const route = Router()

/**
 * @route POST /
 * @description Creates a new calibration configuration record after setting the previously active one to non-actual.
 * This is an atomic operation to ensure only one configuration is current.
 * @access Private (validation only)
 * @middleware {Array<Function>} updateCalibrationConfigToNoActualAndCreateValidator - Validates required fields for the new configuration.
 * @controller CalibrationConfigController.updateCalibrationConfigToNoActualAndCreate - Handles the logic for status update and creation.
 */
route.post(
	'/',
	updateCalibrationConfigToNoActualAndCreateValidator,
	CalibrationConfigController.updateCalibrationConfigToNoActualAndCreate
)

/**
 * @route GET /
 * @description Retrieves a list of all calibration configuration records.
 * @access Private (Requires authentication)
 * @middleware {Function} verifyToken - Ensures the user is authenticated.
 * @middleware {Array<Function>} getAllCalibrationConfigValidator - Validates query parameters (e.g., status filters).
 * @controller CalibrationConfigController.getAllCalibrationConfig - Handles fetching the list.
 */
route.get(
	'/',
	verifyToken,
	getAllCalibrationConfigValidator,
	CalibrationConfigController.getAllCalibrationConfig
)

/**
 * @route GET /:id
 * @description Retrieves a single calibration configuration record by ID.
 * @access Public/Private (Authentication middleware, if required, should be global or added here)
 * @middleware {Array<Function>} getCalibrationConfigValidator - Validates the 'id' route parameter.
 * @controller CalibrationConfigController.getCalibrationConfig - Handles fetching the specific record.
 */
route.get(
	'/:id',
	getCalibrationConfigValidator,
	CalibrationConfigController.getCalibrationConfig
)

export default route
