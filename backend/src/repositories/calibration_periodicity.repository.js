import { CalibrationPeriodicityModel } from '../models/__index.js'

async function createCalibrationPeriodicity(calibrationPeriodicity) {
	const { id } = await CalibrationPeriodicityModel.create(
		calibrationPeriodicity
	)
	return await getCalibrationPeriodicity(id)
}

async function updateCalibrationPeriodicity(id, calibrationPeriodicity) {
	const instanceCalibrationPeriodicity = await getCalibrationPeriodicity(id)

	instanceCalibrationPeriodicity.description =
		calibrationPeriodicity.description
	instanceCalibrationPeriodicity.calibration_days =
		calibrationPeriodicity.calibration_days
	instanceCalibrationPeriodicity.active = calibrationPeriodicity.active

	await instanceCalibrationPeriodicity.save()

	return await getCalibrationPeriodicity(id)
}

async function getAllCalibrationPeriodicity(whereClause) {
	return await CalibrationPeriodicityModel.findAll({
		where: whereClause,
	})
}

async function getCalibrationPeriodicity(id) {
	return await CalibrationPeriodicityModel.findByPk(id)
}

async function updateCalibrationPeriodicityStatus(id, active) {
	await CalibrationPeriodicityModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getCalibrationPeriodicity(id)
}

export default {
	createCalibrationPeriodicity,
	updateCalibrationPeriodicity,
	getAllCalibrationPeriodicity,
	getCalibrationPeriodicity,
	updateCalibrationPeriodicityStatus,
}
