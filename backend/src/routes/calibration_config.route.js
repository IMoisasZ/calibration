import { Router } from 'express'
import CalibrationConfigController from '../controllers/calibration_config.controller.js'
import {
	updateCalibrationConfigToNoActualAndCreateValidator,
	getAllCalibrationConfigValidator,
	getCalibrationConfigValidator,
} from '../middlewares/calibration_config.middleware.js'
import { verifyToken } from '../middlewares/auth.middleware.js'

const route = Router()

route.post(
	'/',
	updateCalibrationConfigToNoActualAndCreateValidator,
	CalibrationConfigController.updateCalibrationConfigToNoActualAndCreate
)
route.get(
	'/',
	verifyToken,
	getAllCalibrationConfigValidator,
	CalibrationConfigController.getAllCalibrationConfig
)
route.get(
	'/:id',
	getCalibrationConfigValidator,
	CalibrationConfigController.getCalibrationConfig
)

export default route
