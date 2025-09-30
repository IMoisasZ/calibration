import CalibrationPeriodicityRepository from '../repositories/calibration_periodicity.repository.js'
import {
	BadRequestError,
	NotFoundError,
	AlreadyAdded,
} from '../errors/customErrors.error.js'
import { UniqueConstraintError } from 'sequelize'

async function existCalibrationRepositoryById(id) {
	if (!id) {
		throw new BadRequestError(`ID não informado!`)
	}

	const calibrationPeriodicity =
		await CalibrationPeriodicityRepository.getCalibrationPeriodicity(id)
	if (!calibrationPeriodicity) {
		throw new NotFoundError(
			`Não foi há periodicidade de calibração cadastrada com o ID ${id}`
		)
	}

	return calibrationPeriodicity
}

async function createCalibrationPeriodicity(calibrationPeriodicity) {
	try {
		return await CalibrationPeriodicityRepository.createCalibrationPeriodicity(
			calibrationPeriodicity
		)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				`A periodicidade de calibração ${calibrationPeriodicity.description} já foi cadastrada!`
			)
		}
		throw error
	}
}

async function updateCalibrationPeriodicity(id, calibrationPeriodicity) {
	await existCalibrationRepositoryById(id)
	try {
		return await CalibrationPeriodicityRepository.updateCalibrationPeriodicity(
			id,
			calibrationPeriodicity
		)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				`A periodicidade de calibração ${calibrationPeriodicity.description} já foi cadastrada!`
			)
		}
		throw error
	}
}

async function getAllCalibrationPeriodicity(status) {
	if (status === 'true') {
		return await CalibrationPeriodicityRepository.getAllCalibrationPeriodicity({
			active: true,
		})
	}
	return await CalibrationPeriodicityRepository.getAllCalibrationPeriodicity({})
}

async function getCalibrationPeriodicity(id) {
	return await existCalibrationRepositoryById(id)
}

async function updateCalibrationPeriodicityStatus(id, active) {
	await existCalibrationRepositoryById(id)
	return await CalibrationPeriodicityRepository.updateCalibrationPeriodicityStatus(
		id,
		active
	)
}

export default {
	createCalibrationPeriodicity,
	updateCalibrationPeriodicity,
	getAllCalibrationPeriodicity,
	getCalibrationPeriodicity,
	updateCalibrationPeriodicityStatus,
}
