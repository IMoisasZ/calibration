import { API } from '../api/API'

async function createLocalization(localization) {
	const { data } = await API.post('localization', localization)
	return data
}

async function updateLocalization(localization) {
	const { data } = await API.put(
		`localization/${Number(localization.id)}`,
		localization
	)

	return data
}

async function getAllLocalization() {
	const { data } = await API.get('localization')
	return data
}

async function updateLocalizationStatus(id, active) {
	const { data } = await API.patch(`localization/${Number(id)}`, { active })
	return data
}

export {
	createLocalization,
	updateLocalization,
	getAllLocalization,
	updateLocalizationStatus,
}
