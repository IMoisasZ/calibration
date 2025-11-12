/** @format */

/**
 * @fileoverview Defines the routes for managing Calibration Analysis records.
 * This module sets up the necessary endpoints for creating a new analysis record.
 *
 * @module CalibrationAnalysisRoutes
 * @requires express
 * @requires CalibrationAnalysisController
 * @requires createCalibrationAnalysisValidator
 */
import { Router } from 'express'
import CalibrationAnalysisController from '../controllers/calibration_analysis.controller.js'
import { createCalibrationAnalysisValidator } from '../middlewares/calibration_analysis.middleware.js'

/**
 * @const {Router} route - Express router instance for calibration analysis.
 */
const route = Router()

/**
 * @route POST /
 * @description Creates a new calibration analysis record.
 * @access Private (assuming authentication is applied before this layer)
 * @middleware {Array<Function>} createCalibrationAnalysisValidator - Validates the request body.
 * @controller CalibrationAnalysisController.createCalibrationAnalysis - Handles the business logic for creation.
 */
route.post(
	'/',
	createCalibrationAnalysisValidator,
	CalibrationAnalysisController.createCalibrationAnalysis
)

export default route
