import CalibrationAnalysisService from '../services/calibration_analysis.service.js'

const routeName = '/calibration_analysis'
async function createCalibrationAnalysis(req, res, next) {
	try {
		const calibrationAnalysis = req.body
		const newCalibrationAnalysis =
			await CalibrationAnalysisService.createCalibrationAnalysis(
				calibrationAnalysis
			)
		res.status(201).send(newCalibrationAnalysis)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(
			calibrationAnalysis
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createCalibrationAnalysis,
}
