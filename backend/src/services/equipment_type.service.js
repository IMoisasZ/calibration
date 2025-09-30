import EquipmentTypeRepository from '../repositories/equipment_type.repository.js'
import { NotFoundError, BadRequestError } from '../errors/customErrors.error.js'
import { EquipmentTypeAlreadyAdded } from '../errors/equipment_type.error.js'
import { UniqueConstraintError } from 'sequelize'

async function existEquipmentTypeId(id) {
	if (!id) {
		throw new BadRequestError('Id não informado!')
	}

	const equipmentType = await EquipmentTypeRepository.getEquipmentType(id)

	if (!equipmentType) {
		throw new NotFoundError(`Não encontrado o tipo de equipamento de ID ${id}`)
	}

	return equipmentType
}

async function createEquipmentType(equipmentType) {
	try {
		return await EquipmentTypeRepository.createEquipmentType(equipmentType)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new EquipmentTypeAlreadyAdded(
				`O tipo de equipamento ${equipmentType.equipment_type} já foi cadastrado!`
			)
		}
		throw error
	}
}

async function updateEquipmentType(id, equipmentType) {
	await existEquipmentTypeId(id)
	try {
		return await EquipmentTypeRepository.updateEquipmentType(id, equipmentType)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new EquipmentTypeAlreadyAdded(
				`O tipo de equipamento ${equipmentType.equipment_type} já foi cadastrado!`
			)
		}
	}
}

async function getAllEquipmentType(status) {
	const whereClause = {}
	if (status !== 'true') {
		return await EquipmentTypeRepository.getAllEquipmentType(whereClause)
	}
	return await EquipmentTypeRepository.getAllEquipmentType({ active: true })
}

async function getEquipmentType(id) {
	return await existEquipmentTypeId(id)
}

async function updateEquipmentTypeStatus(id, active) {
	await existEquipmentTypeId(id)

	return await EquipmentTypeRepository.updateEquipmentTypeStatus(id, active)
}

export default {
	createEquipmentType,
	updateEquipmentType,
	getAllEquipmentType,
	getEquipmentType,
	updateEquipmentTypeStatus,
}
