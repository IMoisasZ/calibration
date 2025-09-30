import { API } from '../api/API'

const routeName = 'calibration_analysis'
async function createCalibrationAnalysis(calibrationAnalysis) {
	const { data } = await API.post(`${routeName}`, calibrationAnalysis)
	return data
}

export { createCalibrationAnalysis }
