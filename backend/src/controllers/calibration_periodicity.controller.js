import CalibrationPeriodicityService from '../services/calibration_periodicity.service.js'

const routeName = '/calibration_periodicity'

async function createCalibrationPeriodicity(req, res, next) {
	try {
		const calibrationPeriodicity = req.body
		const newCalibrationPeriodicity =
			await CalibrationPeriodicityService.createCalibrationPeriodicity(
				calibrationPeriodicity
			)
		res.status(201).send(newCalibrationPeriodicity)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(
			calibrationPeriodicity
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateCalibrationPeriodicity(req, res, next) {
	try {
		const { id } = req.params
		const calibrationPeriodicity = req.body
		const alterCalibrationPeriodicity =
			await CalibrationPeriodicityService.updateCalibrationPeriodicity(
				id,
				calibrationPeriodicity
			)
		res.status(200).send(alterCalibrationPeriodicity)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			calibrationPeriodicity
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllCalibrationPeriodicity(req, res, next) {
	try {
		const { status } = req.query
		const calibrationPeriodicity =
			await CalibrationPeriodicityService.getAllCalibrationPeriodicity(status)
		res.status(200).send(calibrationPeriodicity)
		const loggerMessage = `GET - ${routeName}?status=${status}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getCalibrationPeriodicity(req, res, next) {
	try {
		const { id } = req.params
		const calibrationPeriodicity =
			await CalibrationPeriodicityService.getCalibrationPeriodicity(id)
		res.status(200).send(calibrationPeriodicity)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateCalibrationPeriodicityStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const calibrationPeriodicity =
			await CalibrationPeriodicityService.updateCalibrationPeriodicityStatus(
				id,
				active
			)
		res.status(200).send(calibrationPeriodicity)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${
			active
				? 'Calibration periodicity was enabled'
				: 'Calibration periodicity was disabled'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createCalibrationPeriodicity,
	updateCalibrationPeriodicity,
	getAllCalibrationPeriodicity,
	getCalibrationPeriodicity,
	updateCalibrationPeriodicityStatus,
}
