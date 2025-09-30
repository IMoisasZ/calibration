import { API } from '../api/API'

const pathName = 'unity'
async function createUnity(unity) {
	const { data } = await API.post('unity', unity)
	return data
}

async function updateUnity(unity) {
	const { id } = unity
	delete unity.id
	const { data } = await API.put(`${pathName}/${id}`, unity)
	return data
}

async function getAllUnities(status = true) {
	const { data } = await API.get(`${pathName}?status=${status}`)
	return data
}

async function getUnity(id) {
	const { data } = await API.get(`${pathName}/${id}`)
	return data
}

async function updateUnityStatus(id, active) {
	const { data } = await API.patch(`${pathName}/${id}`, { active })
	return data
}

export { createUnity, updateUnity, getAllUnities, getUnity, updateUnityStatus }
