import { API } from '../api/API'

const route_name = 'equipment_type'
async function createEquipmentType(equipmentType) {
	const { data } = await API.post(`${route_name}`, equipmentType)
	return data
}

async function updateEquipmentType(equipmentType) {
	const { id } = equipmentType
	delete equipmentType.id
	const { data } = await API.put(`${route_name}/${id}`, equipmentType)
	return data
}

async function getAllEquipmentType(status = true) {
	const { data } = await API.get(`${route_name}?status=${status}`)
	return data
}

async function updateEquipmentTypeStatus(id, active) {
	const { data } = await API.patch(`${route_name}/${id}`, { active })
	return data
}

export {
	createEquipmentType,
	updateEquipmentType,
	getAllEquipmentType,
	updateEquipmentTypeStatus,
}
