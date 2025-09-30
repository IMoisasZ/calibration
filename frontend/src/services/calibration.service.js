import { API } from '../api/API'

const pathName = 'calibration'
async function createCalibrationWithResults(formData) {
	const { data } = await API.post(`${pathName}`, formData)
	return data
}

async function getAllCalibrations(status) {
	const { data } = await API.get(`${pathName}?status=${status}`)
	return data
}

async function getAllCalibrationIsAnalysis() {
	const { data } = await API.get(`${pathName}/calibration_list`)
	return data
}

export {
	createCalibrationWithResults,
	getAllCalibrations,
	getAllCalibrationIsAnalysis,
}
