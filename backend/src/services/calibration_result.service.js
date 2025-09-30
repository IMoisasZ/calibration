import CalibrationResultRepository from '../repositories/calibration_result.repository.js'
import CalibrationRepository from '../repositories/calibration.repository.js'
import EquipmentRepository from '../repositories/equipment.repository.js'
import { BadRequestError, NotFoundError } from '../errors/customErrors.error.js'
import {
	biggestDeviationPlusMeasurementUncertainty,
	optimalResolution,
	statusResult,
} from '../utils/calibration_result.utils.js'

async function existCalibrationResultById(id) {
	if (!id) {
		throw new BadRequestError(`ID não informado!`)
	}
	const calibrationResult =
		await CalibrationResultRepository.getCalibrationResult(id)
	if (!calibrationResult) {
		throw new NotFoundError(`Não foi encontrado registros com o ID ${id}`)
	}
	return calibrationResult
}

async function existCalibrationResultByCalibrationId(calibration_id) {
	if (!calibration_id) {
		throw new BadRequestError(`Calibração ID não informada!`)
	}
	const calibrationResult =
		await CalibrationResultRepository.getAllCalibrationResultByCalibrationId(
			calibration_id
		)
	if (calibrationResult.length === 0) {
		throw new NotFoundError(
			`Não foi encontrado registros com a calibração de ID ${calibration_id}`
		)
	}
	return calibrationResult
}

async function _processCalibrationResultData(calibrationResult) {
	const { equipment_id } = await CalibrationRepository.getCalibration(
		calibrationResult.calibration_id
	)

	const equipment = await EquipmentRepository.getEquipment(equipment_id)

	if (!equipment) {
		throw new NotFoundError(
			`Equipamento com ID ${calibrationResult.equipment_id} não encontrado!`
		)
	}

	const { acceptance_criteria } = equipment

	if (
		acceptance_criteria === null ||
		typeof acceptance_criteria === 'undefined'
	) {
		throw new BadRequestError(
			'O critério de aceitação do equipamento não foi informado.'
		)
	}

	calibrationResult.optimal_resolution = optimalResolution(
		Number(acceptance_criteria),
		2
	)

	calibrationResult.biggest_deviation_plus_measurement_uncertainty =
		biggestDeviationPlusMeasurementUncertainty(
			calibrationResult.biggest_deviation,
			calibrationResult.measurement_uncertainty
		)

	calibrationResult.status_result = statusResult(
		Number(acceptance_criteria),
		calibrationResult.biggest_deviation,
		calibrationResult.measurement_uncertainty
	)

	return calibrationResult
}

async function createCalibrationResult(calibrationResult) {
	await _processCalibrationResultData(calibrationResult)
	return await CalibrationResultRepository.createCalibrationResult(
		calibrationResult
	)
}

async function updateCalibrationResult(id, calibrationResult) {
	await existCalibrationResultById(id)
	await _processCalibrationResultData(calibrationResult)

	return await CalibrationResultRepository.updateCalibrationResult(
		id,
		calibrationResult
	)
}

async function getAllCalibrationResultByCalibrationId(calibration_id) {
	return await existCalibrationResultByCalibrationId(calibration_id)
}

async function getCalibrationResult(id) {
	return await existCalibrationResultById(id)
}

async function updateCalibrationResultStatus(id, status_result) {
	await existCalibrationResultById(id)

	if (!status_result) {
		throw new BadRequestError(`Status não informado!`)
	}

	return await CalibrationResultRepository.updateCalibrationResultStatus(
		id,
		status_result
	)
}

async function deleteCalibrationResult(id) {
	const resultToDelete = await existCalibrationResultById(id)
	const calibrationId = resultToDelete.calibration_id

	const isDeleted = await CalibrationResultRepository.deleteCalibrationResult({
		id,
	})

	if (isDeleted) {
		/**@description -> Verify if is the last result */
		const remainingResults =
			await CalibrationResultRepository.getAllCalibrationResultByCalibrationId(
				calibrationId
			)

		if (remainingResults.length === 0) {
			/**@description -> Call the function to delete the calibration */
			await CalibrationRepository.deleteCalibration({ id: calibrationId })
		}
	}
	return isDeleted
}

export default {
	createCalibrationResult,
	updateCalibrationResult,
	getAllCalibrationResultByCalibrationId,
	getCalibrationResult,
	updateCalibrationResultStatus,
	deleteCalibrationResult,
}
