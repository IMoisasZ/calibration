import CalibrationResultService from '../services/calibration_result.service.js'

const routeName = '/calibration_result'
async function createCalibrationResult(req, res, next) {
	try {
		const calibrationResult = req.body
		const newCalibrationResult =
			await CalibrationResultService.createCalibrationResult(calibrationResult)
		res.status(201).send(newCalibrationResult)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(
			calibrationResult
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		console.log({ error })

		next(error)
	}
}

async function updateCalibrationResult(req, res, next) {
	try {
		const { id } = req.params
		const calibrationResult = req.body
		const alterCalibrationResult =
			await CalibrationResultService.updateCalibrationResult(
				id,
				calibrationResult
			)
		res.status(200).send(alterCalibrationResult)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			calibrationResult
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllCalibrationResultByCalibrationId(req, res, next) {
	try {
		const { calibration_id } = req.params
		const calibrationResult =
			await CalibrationResultService.getAllCalibrationResultByCalibrationId(
				calibration_id
			)
		res.status(200).send(calibrationResult)
		const loggerMessage = `GET - ${routeName}/calibration/${calibration_id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getCalibrationResult(req, res, next) {
	try {
		const { id } = req.params
		const calibrationResult =
			await CalibrationResultService.getCalibrationResult(id)
		res.status(200).send(calibrationResult)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateCalibrationResultStatus(req, res, next) {
	try {
		const { id } = req.params
		const { status_result } = req.body
		const calibrationResult =
			await CalibrationResultService.updateCalibrationResultStatus(
				id,
				status_result
			)
		res.status(200).send(calibrationResult)
		const loggerMessage = `PATCH - ${routeName}/${id} - Calibration status = ${status_result}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function deleteCalibrationResult(req, res, next) {
	try {
		const { id } = req.params
		await CalibrationResultService.deleteCalibrationResult(id)
		res.status(204).end()
		const loggerMessage = `DELETE - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createCalibrationResult,
	updateCalibrationResult,
	getAllCalibrationResultByCalibrationId,
	getCalibrationResult,
	updateCalibrationResultStatus,
	deleteCalibrationResult,
}
