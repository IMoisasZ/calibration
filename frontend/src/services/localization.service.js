import { API } from '../api/API'

const routeName = 'localization'
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

async function getAllLocalization(status = 'true') {
	const { data } = await API.get(`${routeName}?status=${status}`)
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
