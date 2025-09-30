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

const route = Router()

route.post(
	'/',
	upload.single('certificate_file'),
	CalibrationController.createCalibrationWithResults
)
route.put(
	'/:id',
	updateCalibrationValidator,
	CalibrationController.updateCalibration
)
route.get(
	'/',
	getAllCalibrationsValidator,
	CalibrationController.getAllCalibrations
)
route.get(
	'/calibration_list',
	CalibrationController.getAllCalibrationsIsAnalysis
)
route.get('/:id', getCalibrationValidator, CalibrationController.getCalibration)
route.delete(
	'/:id',
	deleteCalibrationValidator,
	CalibrationController.deleteCalibration
)
route.patch(
	'/:id',
	patchCalibrationByCalibrationAnalysis,
	CalibrationController.patchCalibrationByCalibrationAnalysis
)

export default route
