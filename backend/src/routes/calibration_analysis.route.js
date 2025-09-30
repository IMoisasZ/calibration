import { Router } from 'express'
import CalibrationAnalysisController from '../controllers/calibration_analysis.controller.js'
import { createCalibrationAnalysisValidator } from '../middlewares/calibration_analysis.middleware.js'

const route = Router()

route.post(
	'/',
	createCalibrationAnalysisValidator,
	CalibrationAnalysisController.createCalibrationAnalysis
)

export default route
