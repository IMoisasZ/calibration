import LocalizationRepository from '../repositories/localization.repository.js'
import {
	BadRequestError,
	NotFoundError,
	AlreadyAdded,
} from '../errors/customErrors.error.js'
import { UniqueConstraintError } from 'sequelize'

/**@description -> Function to verify if exist localization */
async function verifyLocalizationExistence(id) {
	if (!id) {
		throw new BadRequestError(`ID não informado!`)
	}

	const localization = await LocalizationRepository.getLocalization(id)
	if (!localization) {
		throw new NotFoundError(`A localização com ID ${id} não existe!`)
	}
	return localization
}

async function createLocalization(localization) {
	try {
		return await LocalizationRepository.createLocalization(localization)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				`A localização ${localization.description.toUpperCase()} já foi cadastrada!`
			)
		}
		throw error
	}
}

async function updateLocalization(id, localization) {
	await verifyLocalizationExistence(id)

	try {
		return await LocalizationRepository.updateLocalization(id, localization)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				`A localização ${localization.description.toUpperCase()} já foi cadastrada!`
			)
		}
		throw error
	}
}

async function getAllLocalization() {
	return await LocalizationRepository.getAllLocalization()
}

async function getLocalization(id) {
	const localization = await verifyLocalizationExistence(id)

	return await localization
}

async function updateLocalizationStatus(id, active) {
	await verifyLocalizationExistence(id)
	if (active === undefined) {
		throw new BadRequestError(`Active não informado!`)
	}
	return await LocalizationRepository.updateLocalizationStatus(id, active)
}

export default {
	createLocalization,
	updateLocalization,
	getAllLocalization,
	getLocalization,
	updateLocalizationStatus,
}
