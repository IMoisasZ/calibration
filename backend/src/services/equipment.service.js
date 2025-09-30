import EquipmentRepository from '../repositories/equipment.repository.js'
import { UniqueConstraintError } from 'sequelize'
import {
	BadRequestError,
	NotFoundError,
	AlreadyAdded,
} from '../errors/customErrors.error.js'

async function existEquipmentId(id) {
	if (!id) {
		throw new BadRequestError(`ID não informado!`)
	}

	const equipment = await EquipmentRepository.getEquipment(id)
	if (!equipment) {
		throw new NotFoundError(`O equipamento com ID ${id} não existe!!`)
	}

	return equipment
}

async function createEquipment(equipment) {
	try {
		return await EquipmentRepository.createEquipment(equipment)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				`O equipamento ${equipment.identifier} já foi cadastrado!`
			)
		}
		throw error
	}
}

async function updateEquipment(id, equipment) {
	await existEquipmentId(id)
	try {
		return await EquipmentRepository.updateEquipment(id, equipment)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(
				`O equipamento ${equipment.identifier} já foi cadastrado!`
			)
		}
		throw error
	}
}

async function getAllEquipment(status) {
	if (status !== 'true') {
		return await EquipmentRepository.getAllEquipment({})
	}
	return await EquipmentRepository.getAllEquipment({ active: true })
}

async function getEquipment(id) {
	return await existEquipmentId(id)
}

async function getEquipmentByIdentifier(identifier) {
	if (!identifier) {
		throw new BadRequestError(`Identificação do equipamento não informada!`)
	}

	const equipmentIdentifier =
		await EquipmentRepository.getEquipmentByIdentifier(identifier)

	if (!equipmentIdentifier) {
		throw new NotFoundError(
			`Equipamento com a identificação ${identifier} não encontrado!`
		)
	}

	return equipmentIdentifier
}

async function updateEquipmentStatus(id, active) {
	await existEquipmentId(id)

	return await EquipmentRepository.updateEquipmentStatus(id, active)
}

export default {
	createEquipment,
	updateEquipment,
	getAllEquipment,
	getEquipment,
	getEquipmentByIdentifier,
	updateEquipmentStatus,
}
