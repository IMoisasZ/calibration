import {
	EquipmentModel,
	EquipmentTypeModel,
	UnityModel,
	LocalizationModel,
	OwnerModel,
	CalibrationPeriodicityModel,
} from '../models/__index.js'

async function createEquipment(equipment) {
	const { id } = await EquipmentModel.create(equipment)
	return await getEquipment(id)
}

async function updateEquipment(id, equipment) {
	const instanceEquipment = await getEquipment(id)

	instanceEquipment.equipment_type_id = equipment.equipment_type_id
	instanceEquipment.identifier = equipment.identifier
	instanceEquipment.description = equipment.description
	instanceEquipment.owner_id = equipment.owner_id
	instanceEquipment.division = equipment.division
	instanceEquipment.division_unity_id = equipment.division_unity_id
	instanceEquipment.min_capacity = equipment.min_capacity
	instanceEquipment.max_capacity = equipment.max_capacity
	instanceEquipment.capacity_unity_id = equipment.capacity_unity_id
	instanceEquipment.calibration_periodicity = equipment.calibration_periodicity
	instanceEquipment.active = equipment.active

	await instanceEquipment.save()

	return await getEquipment(id)
}

async function getAllEquipment(whereClause) {
	return await EquipmentModel.findAll({
		where: whereClause,
		include: [
			{
				model: EquipmentTypeModel,
			},
			{
				model: OwnerModel,
				include: {
					model: LocalizationModel,
				},
			},
			{
				model: UnityModel,
			},
			{
				model: CalibrationPeriodicityModel,
			},
		],
	})
}

async function getEquipment(id) {
	return await EquipmentModel.findByPk(id, {
		include: [
			{
				model: EquipmentTypeModel,
			},
			{
				model: OwnerModel,
				include: {
					model: LocalizationModel,
				},
			},
			{
				model: UnityModel,
			},
			{
				model: CalibrationPeriodicityModel,
			},
		],
	})
}

async function getEquipmentByIdentifier(identifier) {
	return await EquipmentModel.findOne({
		where: {
			identifier,
		},
		include: [
			{
				model: EquipmentTypeModel,
			},
			{
				model: OwnerModel,
				include: {
					model: LocalizationModel,
				},
			},
			{
				model: UnityModel,
			},
			{
				model: CalibrationPeriodicityModel,
			},
		],
	})
}

async function updateEquipmentStatus(id, active) {
	await EquipmentModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getEquipment(id)
}

export default {
	createEquipment,
	updateEquipment,
	getAllEquipment,
	getEquipment,
	getEquipmentByIdentifier,
	updateEquipmentStatus,
}
