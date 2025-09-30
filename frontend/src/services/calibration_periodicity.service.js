import { API } from '../api/API'

const pathName = 'calibration_periodicity'
async function createCalibrationPeriodicity(calibrationPeriodicity) {
	delete calibrationPeriodicity.id
	const { data } = API.post(`${pathName}`, calibrationPeriodicity)
	return data
}

async function updateCalibrationPeriodicity(calibrationPeriodicity) {
	const { id } = calibrationPeriodicity
	delete calibrationPeriodicity.id
	const { data } = await API.put(`${pathName}/${id}`, calibrationPeriodicity)
	return data
}

async function getAllCalibrationPeriodicity(status = true) {
	const { data } = await API.get(`${pathName}?status=${status}`)
	return data
}

async function getCalibrationPeriodicity(id) {
	const { data } = await API.get(`${pathName}/${id}`)
	return data
}

async function updateCalibrationPeriodicityStatus(id, active) {
	const { data } = await API.patch(`${pathName}/${id}`, { active })
	return data
}

export {
	createCalibrationPeriodicity,
	updateCalibrationPeriodicity,
	getAllCalibrationPeriodicity,
	getCalibrationPeriodicity,
	updateCalibrationPeriodicityStatus,
}
