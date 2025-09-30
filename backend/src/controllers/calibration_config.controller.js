import CalibrationConfigService from '../services/calibration_config.service.js'

const pathName = '/calibration_config'

async function updateCalibrationConfigToNoActualAndCreate(req, res, next) {
	try {
		const calibrationConfig = req.body
		const newCalibrationConfig =
			await CalibrationConfigService.updateCalibrationConfigToNoActualAndCreate(
				calibrationConfig
			)
		res.status(201).send(newCalibrationConfig)
		const loggerMessage = `POST - ${pathName} - ${JSON.stringify(
			calibrationConfig
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllCalibrationConfig(req, res, next) {
	try {
		const { actual } = req.query
		const calibrationConfig =
			await CalibrationConfigService.getAllCalibrationConfig(actual)
		res.status(200).send(calibrationConfig)
		const loggerMessage = `GET - ${pathName}?actual=${actual}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getCalibrationConfig(req, res, next) {
	try {
		const { id } = req.params
		const calibrationConfig =
			await CalibrationConfigService.getCalibrationConfig(id)
		res.status(200).send(calibrationConfig)
		const loggerMessage = `GET - ${pathName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	updateCalibrationConfigToNoActualAndCreate,
	getAllCalibrationConfig,
	getCalibrationConfig,
}
