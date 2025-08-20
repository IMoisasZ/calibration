import LocalizationRepository from '../repositories/localization.repository.js'
import { BadRequestError, NotFoundError } from '../errors/customErrors.error.js'

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
	return await LocalizationRepository.createLocalization(localization)
}

async function updateLocalization(id, localization) {
	await verifyLocalizationExistence(id)

	return await LocalizationRepository.updateLocalization(id, localization)
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
