import { API } from '../api/API'

const routeNameCalibrationConfig = 'calibration_config'

async function updateCalibrationConfigNotActualAndCreate(calibrationConfig) {
	const { data } = await API.post(
		`${routeNameCalibrationConfig}`,
		calibrationConfig
	)
	return data
}

async function getAllCalibrationConfig(actual = true) {
	const { data } = await API.get(
		`${routeNameCalibrationConfig}?actual=${actual}`
	)
	return data
}

async function getCalibrationConfig(id) {
	const { data } = await API.get(`${routeNameCalibrationConfig}/${id}`)
	return data
}

export {
	updateCalibrationConfigNotActualAndCreate,
	getAllCalibrationConfig,
	getCalibrationConfig,
}
