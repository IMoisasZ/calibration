import { API } from '../api/API'

const pathName = 'equipment'
async function createEquipment(equipment) {
	delete equipment.id
	const { data } = await API.post(`${pathName}`, equipment)

	return data
}

async function updateEquipment(equipment) {
	const { id } = equipment
	const { data } = await API.put(`${pathName}/${id}`, equipment)
	return data
}

async function getAllEquipment(status = true) {
	const { data } = await API.get(`${pathName}?status=${status}`)
	return data
}

async function getEquipment(id) {
	const { data } = await API.get(`${pathName}/${id}`)
	return data
}

async function getEquipmentByIdentifier(identifier) {
	const { data } = await API.get(`${pathName}/by-identifier/${identifier}`)
	return data
}

async function updateEquipmentStatus(id, active) {
	const { data } = await API.patch(`${pathName}/${id}`, { active })
	return data
}

export {
	createEquipment,
	updateEquipment,
	getAllEquipment,
	getEquipment,
	getEquipmentByIdentifier,
	updateEquipmentStatus,
}
