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

const route = Router()

route.post(
	'/',
	createCalibrationResultValidator,
	CalibrationResultController.createCalibrationResult
)
route.put(
	'/:id',
	updateCalibrationResultValidator,
	CalibrationResultController.updateCalibrationResult
)
route.get(
	'/calibration/:calibration_id',
	getAllCalibrationResultByCalibrationIdValidator,
	CalibrationResultController.getAllCalibrationResultByCalibrationId
)
route.get(
	'/:id',
	getCalibrationResultValidator,
	CalibrationResultController.getCalibrationResult
)
route.patch(
	'/:id',
	updateCalibrationResultStatusValidator,
	CalibrationResultController.updateCalibrationResultStatus
)
route.delete(
	'/:id',
	deleteCalibrationResultValidator,
	CalibrationResultController.deleteCalibrationResult
)

export default route
