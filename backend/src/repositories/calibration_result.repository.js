import { CalibrationResultModel } from '../models/__index.js'

async function createCalibrationResult(calibrationResult) {
	const { id } = await CalibrationResultModel.create(calibrationResult)
	return await getCalibrationResult(id)
}

async function updateCalibrationResult(id, calibrationResult) {
	const instanceCalibrationResult = await getCalibrationResult(id)

	Object.assign(instanceCalibrationResult, calibrationResult)
	await instanceCalibrationResult.save()

	return await getCalibrationResult(id)
}

async function getAllCalibrationResultByCalibrationId(calibration_id) {
	return await CalibrationResultModel.findAll({
		where: {
			calibration_id,
		},
	})
}

async function getCalibrationResult(id) {
	return await CalibrationResultModel.findByPk(id)
}

async function updateCalibrationResultStatus(id, status_result) {
	await CalibrationResultModel.update(
		{ status_result },
		{
			where: {
				id,
			},
		}
	)
	return await getCalibrationResult(id)
}

async function deleteCalibrationResult(whereClause) {
	const deleted = await CalibrationResultModel.destroy({
		where: whereClause,
	})
	return deleted > 0
}

export default {
	createCalibrationResult,
	updateCalibrationResult,
	getAllCalibrationResultByCalibrationId,
	getCalibrationResult,
	updateCalibrationResultStatus,
	deleteCalibrationResult,
}
