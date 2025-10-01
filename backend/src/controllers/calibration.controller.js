/** @format */

import CalibrationService from '../services/calibration.service.js'

const routeName = '/calibration'
const BASE_URL_CERTIFICATES = 'uploads/certificates/'
async function createCalibration(req, res, next) {
	try {
		const calibration = req.body
		const newCalibration = await CalibrationService.createCalibration(
			calibration
		)
		res.status(201).send(newCalibration)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(calibration)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateCalibration(req, res, next) {
	try {
		const { id } = req.params
		const calibration = req.body
		const alterCalibration = await CalibrationService.updateCalibration(
			id,
			calibration
		)
		res.status(200).send(alterCalibration)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(
			calibration
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllCalibrations(req, res, next) {
	try {
		const { status } = req.query
		const calibration = await CalibrationService.getAllCalibrations(status)
		res.status(200).send(calibration)
		const loggerMessage = `GET - ${routeName}?status=${status}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllCalibrationsIsAnalysis(req, res, next) {
	try {
		const calibration = await CalibrationService.getAllCalibrationsIsAnalysis()
		res.status(200).send(calibration)
		const loggerMessage = `GET - ${routeName}/calibration_list`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getCalibration(req, res, next) {
	try {
		const { id } = req.params
		const calibration = await CalibrationService.getCalibration(id)
		res.status(200).send(calibration)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function deleteCalibration(req, res, next) {
	try {
		const { id } = req.params
		await CalibrationService.deleteCalibration(id)
		res.status(204).end()
		const loggerMessage = `DELETE - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

// calibration with calibration_result
async function createCalibrationWithResults(req, res, next) {
	try {
		const calibrationData = JSON.parse(req.body.calibrationData)
		const calibrationResults = JSON.parse(req.body.calibrationResults)
		console.log(typeof calibrationResults)

		const certificateFilePath = req.file
			? `${BASE_URL_CERTIFICATES}${req.file.filename}`
			: null

		const finalData = {
			...calibrationData,
			certificate_file: certificateFilePath, // Agora o caminho do arquivo está aqui
			calibration_results: calibrationResults,
		}

		const newCalibration =
			await CalibrationService.createCalibrationWithResults(finalData)

		return res.status(201).send(newCalibration)
	} catch (error) {
		console.error('Erro ao salvar a calibração:', error)
		next(error)
	}
}

async function patchCalibrationByCalibrationAnalysis(req, res, next) {
	try {
		const { id } = req.params
		const { is_analysis } = req.body
		const calibration =
			await CalibrationService.patchCalibrationByCalibrationAnalysis(
				is_analysis,
				id
			)
		res.status(200).send(calibration)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${is_analysis}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createCalibration,
	updateCalibration,
	getAllCalibrations,
	getAllCalibrationsIsAnalysis,
	getCalibration,
	deleteCalibration,
	createCalibrationWithResults,
	patchCalibrationByCalibrationAnalysis,
}
