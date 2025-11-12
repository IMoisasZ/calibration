/** @format */

/**
 * @fileoverview Defines the routes for managing Calibration records.
 * This module sets up CRUD operations and specialized routes for analysis and file uploads.
 *
 * @module CalibrationRoutes
 * @requires express
 * @requires CalibrationController
 * @requires calibration_upload.middleware (for file handling)
 * @requires calibration.middleware
 */
import { Router } from 'express'
import CalibrationController from '../controllers/calibration.controller.js'
import upload from '../middlewares/calibration_upload.middleware.js'
import {
	updateCalibrationValidator,
	getAllCalibrationsValidator,
	getCalibrationValidator,
	deleteCalibrationValidator,
	patchCalibrationByCalibrationAnalysis,
} from '../middlewares/calibration.middleware.js'

/**
 * @const {Router} route - Express router instance for calibration records.
 */
const route = Router()

/**
 * @route POST /
 * @description Creates a new calibration record, including related results, and handles the upload of a certificate file.
 * @access Private
 * @middleware {Function} upload.single('certificate_file') - Handles the single file upload (certificate).
 * @controller CalibrationController.createCalibrationWithResults - Handles creation and business logic.
 */
route.post(
	'/',
	upload.single('certificate_file'),
	CalibrationController.createCalibrationWithResults
)

/**
 * @route PUT /:id
 * @description Fully updates an existing calibration record by ID.
 * @access Private
 * @middleware {Array<Function>} updateCalibrationValidator - Validates the ID and the full request body.
 * @controller CalibrationController.updateCalibration - Handles the full update logic.
 */
route.put(
	'/:id',
	updateCalibrationValidator,
	CalibrationController.updateCalibration
)

/**
 * @route GET /
 * @description Retrieves a list of all calibration records, applying necessary filters.
 * @access Private
 * @middleware {Array<Function>} getAllCalibrationsValidator - Validates query parameters (e.g., status/filters).
 * @controller CalibrationController.getAllCalibrations - Handles fetching the list.
 */
route.get(
	'/',
	getAllCalibrationsValidator,
	CalibrationController.getAllCalibrations
)

/**
 * @route GET /calibration_list
 * @description Retrieves a list of calibrations specifically filtered as "ready for analysis" or similar.
 * @access Private
 * @controller CalibrationController.getAllCalibrationsIsAnalysis - Handles fetching the specialized list.
 */
route.get(
	'/calibration_list',
	CalibrationController.getAllCalibrationsIsAnalysis
)

/**
 * @route GET /:id
 * @description Retrieves a single calibration record by its ID.
 * @access Private
 * @middleware {Array<Function>} getCalibrationValidator - Validates the 'id' route parameter.
 * @controller CalibrationController.getCalibration - Handles fetching the specific record.
 */
route.get('/:id', getCalibrationValidator, CalibrationController.getCalibration)

/**
 * @route GET /:id
 * @description Retrieves a single calibration record by its ID.
 * @access Private
 * @middleware {Array<Function>} getCalibrationValidator - Validates the 'id' route parameter.
 * @controller CalibrationController.getCalibration - Handles fetching the specific record.
 */
route.delete(
	'/:id',
	deleteCalibrationValidator,
	CalibrationController.deleteCalibration
)

/**
 * @route PATCH /:id
 * @description Partial update used to link or update the status based on a Calibration Analysis.
 * @access Private
 * @middleware {Array<Function>} patchCalibrationByCalibrationAnalysis - Validates the required analysis-related body fields.
 * @controller CalibrationController.patchCalibrationByCalibrationAnalysis - Handles the partial update logic.
 */
route.patch(
	'/:id',
	patchCalibrationByCalibrationAnalysis,
	CalibrationController.patchCalibrationByCalibrationAnalysis
)

export default route
