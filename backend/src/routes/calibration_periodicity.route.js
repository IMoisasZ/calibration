/** @format */

/**
 * @fileoverview Defines the routes for managing Calibration Periodicity records.
 * This module sets up the full CRUD operations (Create, Read, Update, Status Update) for the entity.
 *
 * @module CalibrationPeriodicityRoutes
 * @requires express
 * @requires CalibrationPeriodicityController
 * @requires calibration_periodicity.middleware
 */
import { Router } from 'express'
import CalibrationPeriodicityController from '../controllers/calibration_periodicity.controller.js'
import {
	createCalibrationPeriodicityValidator,
	updateCalibrationPeriodicityValidator,
	getAllCalibrationPeriodicityValidator,
	getCalibrationPeriodicityValidator,
	updateCalibrationPeriodicityStatusValidator,
} from '../middlewares/calibration_periodicity.middleware.js'

/**
 * @const {Router} route - Express router instance for calibration periodicity.
 */
const route = Router()

/**
 * @route POST /
 * @description Creates a new calibration periodicity record.
 * @access Private
 * @middleware {Array<Function>} createCalibrationPeriodicityValidator - Validates the request body.
 * @controller CalibrationPeriodicityController.createCalibrationPeriodicity - Handles the creation logic.
 */
route.post(
	'/',
	createCalibrationPeriodicityValidator,
	CalibrationPeriodicityController.createCalibrationPeriodicity
)

/**
 * @route PUT /:id
 * @description Fully updates an existing calibration periodicity record by ID.
 * @access Private
 * @middleware {Array<Function>} updateCalibrationPeriodicityValidator - Validates the ID parameter and the request body.
 * @controller CalibrationPeriodicityController.updateCalibrationPeriodicity - Handles the full update logic.
 */
route.put(
	'/:id',
	updateCalibrationPeriodicityValidator,
	CalibrationPeriodicityController.updateCalibrationPeriodicity
)

/**
 * @route GET /
 * @description Retrieves a list of all calibration periodicity records, supporting query filters (e.g., status).
 * @access Private
 * @middleware {Array<Function>} getAllCalibrationPeriodicityValidator - Validates query parameters.
 * @controller CalibrationPeriodicityController.getAllCalibrationPeriodicity - Handles fetching the list.
 */
route.get(
	'/',
	getAllCalibrationPeriodicityValidator,
	CalibrationPeriodicityController.getAllCalibrationPeriodicity
)

/**
 * @route GET /:id
 * @description Retrieves a single calibration periodicity record by ID.
 * @access Private
 * @middleware {Array<Function>} getCalibrationPeriodicityValidator - Validates the 'id' route parameter.
 * @controller CalibrationPeriodicityController.getCalibrationPeriodicity - Handles fetching the specific record.
 */
route.get(
	'/:id',
	getCalibrationPeriodicityValidator,
	CalibrationPeriodicityController.getCalibrationPeriodicity
)

/**
 * @route PATCH /:id
 * @description Updates the active status of a calibration periodicity record (e.g., disable/enable).
 * @access Private
 * @middleware {Array<Function>} updateCalibrationPeriodicityStatusValidator - Validates the ID parameter and the 'active' field in the body.
 * @controller CalibrationPeriodicityController.updateCalibrationPeriodicityStatus - Handles the partial status update logic.
 */
route.patch(
	'/:id',
	updateCalibrationPeriodicityStatusValidator,
	CalibrationPeriodicityController.updateCalibrationPeriodicityStatus
)

export default route
