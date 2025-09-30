import { EquipmentTypeModel } from '../models/__index.js'

async function createEquipmentType(equipmentType) {
	return await EquipmentTypeModel.create(equipmentType)
}

async function updateEquipmentType(id, equipmentType) {
	await EquipmentTypeModel.update(equipmentType, {
		where: {
			id,
		},
	})
	return await getEquipmentType(id)
}

async function getAllEquipmentType(whereClause) {
	return await EquipmentTypeModel.findAll({
		where: whereClause,
	})
}

async function getEquipmentType(id) {
	return await EquipmentTypeModel.findByPk(id)
}

async function updateEquipmentTypeStatus(id, active) {
	await EquipmentTypeModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getEquipmentType(id)
}

export default {
	createEquipmentType,
	updateEquipmentType,
	getAllEquipmentType,
	getEquipmentType,
	updateEquipmentTypeStatus,
}
