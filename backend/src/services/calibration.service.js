import CalibrationRepository from '../repositories/calibration.repository.js'
import CalibrationResultRepository from '../repositories/calibration_result.repository.js'
import EquipmentRepository from '../repositories/equipment.repository.js'
import CalibrationPeriodicityRepository from '../repositories/calibration_periodicity.repository.js'
import { BadRequestError, NotFoundError } from '../errors/customErrors.error.js'
import { nextCalibration } from '../utils/next_calibration.utils.js'

async function existCalibrationById(id) {
	if (!id) {
		throw new BadRequestError(`ID não informado!`)
	}
	const calibration = await CalibrationRepository.getCalibration(id)
	if (!calibration) {
		throw new NotFoundError(`Calibração com ID ${id} não encontrada!`)
	}
	return calibration
}

async function newCalibrationDate(calibration) {
	if (!calibration) {
		throw new BadRequestError('Dados da calibração não informados!')
	}
	const { calibration_periodicity_id } = await EquipmentRepository.getEquipment(
		calibration.equipment_id
	)
	const { calibration_days } =
		await CalibrationPeriodicityRepository.getCalibrationPeriodicity(
			calibration_periodicity_id
		)
	return nextCalibration(calibration.calibration_date, calibration_days)
}

async function createCalibration(calibration) {
	calibration.next_calibration = await newCalibrationDate(calibration)

	return await CalibrationRepository.createCalibration(calibration)
}

async function updateCalibration(id, calibration) {
	await existCalibrationById(id)
	calibration.next_calibration = await newCalibrationDate(calibration)

	return await CalibrationRepository.updateCalibration(id, calibration)
}

async function getAllCalibrations(status) {
	if (status.trim()) {
		return await CalibrationRepository.getAllCalibrations({
			calibration_status: status,
			is_analysis: false,
		})
	}
	return await CalibrationRepository.getAllCalibrations({ is_analysis: false })
}

async function getAllCalibrationsIsAnalysis() {
	return await CalibrationRepository.getAllCalibrationsIsAnalysis()
}

async function getCalibration(id) {
	return await existCalibrationById(id)
}

async function deleteCalibration(id) {
	await existCalibrationById(id)
	return await CalibrationRepository.deleteCalibration(id)
}

// calibration with calibrationResults
async function createCalibrationWithResults(data) {
	// 1. Desestruture os dados para preparar a chamada ao repositório
	const { calibration_results, ...calibrationData } = data

	// 2. Passe os argumentos separados e a transação para a função de repositório
	const newCalibration =
		await CalibrationRepository.createCalibrationWithResults(
			calibrationData,
			calibration_results, // Passe o array aqui
			null // A transação será gerenciada dentro do repositório
		)

	return newCalibration
}

async function patchCalibrationByCalibrationAnalysis(is_analysis, id) {
	await existCalibrationById(id)

	return await CalibrationRepository.patchCalibrationByCalibrationAnalysis(
		is_analysis,
		id
	)
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
