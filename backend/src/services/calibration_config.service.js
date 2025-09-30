import CalibrationConfigRepository from '../repositories/calibration_config.repository.js'
import { BadRequestError, NotFoundError } from '../errors/customErrors.error.js'

async function updateCalibrationConfigToNoActualAndCreate(calibrationConfig) {
	if (
		typeof calibrationConfig.factor !== 'number' ||
		!Number.isInteger(calibrationConfig.factor) ||
		calibrationConfig.factor <= 0
	) {
		throw new BadRequestError(
			`O fator de calibração deve ser um numero inteiro e positivo!`
		)
	}

	return await CalibrationConfigRepository.updateCalibrationConfigToNoActualAndCreate(
		calibrationConfig
	)
}

async function getAllCalibrationConfig(actual) {
	if (actual === 'true') {
		return await CalibrationConfigRepository.getAllCalibrationConfig({
			actual: true,
		})
	}
	return await CalibrationConfigRepository.getAllCalibrationConfig({})
}

async function getCalibrationConfig(id) {
	const existCalibrationConfig =
		await CalibrationConfigRepository.getCalibrationConfig(id)
	if (!existCalibrationConfig) {
		throw new NotFoundError(`Não há uma configuração com o ID ${id}`)
	}
	return existCalibrationConfig
}

export default {
	updateCalibrationConfigToNoActualAndCreate,
	getAllCalibrationConfig,
	getCalibrationConfig,
}
