import { Router } from 'express'
import CalibrationConfigController from '../controllers/calibration_config.controller.js'
import {
	updateCalibrationConfigToNoActualAndCreateValidator,
	getAllCalibrationConfigValidator,
	getCalibrationConfigValidator,
} from '../middlewares/calibration_config.middleware.js'

const route = Router()

route.post(
	'/',
	updateCalibrationConfigToNoActualAndCreateValidator,
	CalibrationConfigController.updateCalibrationConfigToNoActualAndCreate
)
route.get(
	'/',
	getAllCalibrationConfigValidator,
	CalibrationConfigController.getAllCalibrationConfig
)
route.get(
	'/:id',
	getCalibrationConfigValidator,
	CalibrationConfigController.getCalibrationConfig
)

export default route
