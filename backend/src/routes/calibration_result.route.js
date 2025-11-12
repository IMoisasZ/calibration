/** @format */

/**
 * @fileoverview Defines the routes for managing Calibration Result records.
 * This module sets up the full CRUD operations, including a dedicated route for fetching results based on the parent calibration ID.
 *
 * @module CalibrationResultRoutes
 * @requires express
 * @requires CalibrationResultController
 * @requires calibration_result.middleware
 */
import { Router } from 'express'
import CalibrationResultController from '../controllers/calibration_result.controller.js'
import {
	createCalibrationResultValidator,
	updateCalibrationResultValidator,
	getAllCalibrationResultByCalibrationIdValidator,
	getCalibrationResultValidator,
	updateCalibrationResultStatusValidator,
	deleteCalibrationResultValidator,
} from '../middlewares/calibration_result.middleware.js'

/**
 * @const {Router} route - Express router instance for calibration results.
 */
const route = Router()

/**
 * @route POST /
 * @description Creates a new calibration result record.
 * @access Private
 * @middleware {Array<Function>} createCalibrationResultValidator - Validates the request body.
 * @controller CalibrationResultController.createCalibrationResult - Handles the creation logic.
 */
route.post(
	'/',
	createCalibrationResultValidator,
	CalibrationResultController.createCalibrationResult
)

/**
 * @route PUT /:id
 * @description Fully updates an existing calibration result record by ID.
 * @access Private
 * @middleware {Array<Function>} updateCalibrationResultValidator - Validates the ID parameter and the full request body.
 * @controller CalibrationResultController.updateCalibrationResult - Handles the full update logic.
 */
route.put(
	'/:id',
	updateCalibrationResultValidator,
	CalibrationResultController.updateCalibrationResult
)

/**
 * @route GET /calibration/:calibration_id
 * @description Retrieves a list of all calibration results belonging to a specific parent calibration ID.
 * @access Private
 * @middleware {Array<Function>} getAllCalibrationResultByCalibrationIdValidator - Validates the 'calibration_id' parameter.
 * @controller CalibrationResultController.getAllCalibrationResultByCalibrationId - Handles fetching the list.
 */
route.get(
	'/calibration/:calibration_id',
	getAllCalibrationResultByCalibrationIdValidator,
	CalibrationResultController.getAllCalibrationResultByCalibrationId
)

/**
 * @route GET /:id
 * @description Retrieves a single calibration result record by its ID.
 * @access Private
 * @middleware {Array<Function>} getCalibrationResultValidator - Validates the 'id' route parameter.
 * @controller CalibrationResultController.getCalibrationResult - Handles fetching the specific record.
 */
route.get(
	'/:id',
	getCalibrationResultValidator,
	CalibrationResultController.getCalibrationResult
)

/**
 * @route PATCH /:id
 * @description Updates the active status of a calibration result record (partial update).
 * @access Private
 * @middleware {Array<Function>} updateCalibrationResultStatusValidator - Validates the ID parameter and the status field.
 * @controller CalibrationResultController.updateCalibrationResultStatus - Handles the partial status update logic.
 */
route.patch(
	'/:id',
	updateCalibrationResultStatusValidator,
	CalibrationResultController.updateCalibrationResultStatus
)

/**
 * @route DELETE /:id
 * @description Deletes a calibration result record by ID.
 * @access Private
 * @middleware {Array<Function>} deleteCalibrationResultValidator - Validates the 'id' route parameter.
 * @controller CalibrationResultController.deleteCalibrationResult - Handles the deletion logic.
 */
route.delete(
	'/:id',
	deleteCalibrationResultValidator,
	CalibrationResultController.deleteCalibrationResult
)

export default route
