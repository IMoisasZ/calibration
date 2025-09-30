import { LocalizationModel } from '../models/__index.js'

async function createLocalization(localization) {
	const newLocalization = await LocalizationModel.create(localization)
	return await newLocalization
}

async function updateLocalization(id, localization) {
	await LocalizationModel.update(localization, {
		where: {
			id,
		},
	})
	return await getLocalization(id)
}

async function getAllLocalization() {
	return await LocalizationModel.findAll()
}

async function getLocalization(id) {
	return await LocalizationModel.findByPk(id)
}

async function updateLocalizationStatus(id, active) {
	await LocalizationModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getLocalization(id)
}

export default {
	createLocalization,
	updateLocalization,
	getAllLocalization,
	getLocalization,
	updateLocalizationStatus,
}
