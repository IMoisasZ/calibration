import { Router } from 'express'
import CalibrationPeriodicityController from '../controllers/calibration_periodicity.controller.js'
import {
	createCalibrationPeriodicityValidator,
	updateCalibrationPeriodicityValidator,
	getAllCalibrationPeriodicityValidator,
	getCalibrationPeriodicityValidator,
	updateCalibrationPeriodicityStatusValidator,
} from '../middlewares/calibration_periodicity.middleware.js'

const route = Router()

route.post(
	'/',
	createCalibrationPeriodicityValidator,
	CalibrationPeriodicityController.createCalibrationPeriodicity
)
route.put(
	'/:id',
	updateCalibrationPeriodicityValidator,
	CalibrationPeriodicityController.updateCalibrationPeriodicity
)
route.get(
	'/',
	getAllCalibrationPeriodicityValidator,
	CalibrationPeriodicityController.getAllCalibrationPeriodicity
)
route.get(
	'/:id',
	getCalibrationPeriodicityValidator,
	CalibrationPeriodicityController.getCalibrationPeriodicity
)
route.patch(
	'/:id',
	updateCalibrationPeriodicityStatusValidator,
	CalibrationPeriodicityController.updateCalibrationPeriodicityStatus
)

export default route
