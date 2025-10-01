import { OwnerModel, LocalizationModel } from '../models/__index.js'
import { Op } from 'sequelize'

async function createOwner(owner) {
	const { id } = await OwnerModel.create(owner)
	return await getOwner(id)
}

async function updateOwner(id, owner) {
	const instanceOwner = await getOwner(id)

	Object.assign(instanceOwner, owner)

	await instanceOwner.save()

	return instanceOwner
}

async function getAllOwner(whereClause) {
	return await OwnerModel.findAll({
		where: whereClause,
		include: {
			model: LocalizationModel,
		},
	})
}

async function getOwner(id) {
	return await OwnerModel.findByPk(id, {
		include: {
			model: LocalizationModel,
		},
	})
}

async function updateOwnerStatus(id, active) {
	await OwnerModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getOwner(id)
}

async function getExistOwnerAndLocalization(owner, localization_id, id) {
	return await OwnerModel.findAll({
		where: {
			[Op.and]: [{ owner }, { localization_id }, { id: { [Op.ne]: id } }],
		},
	})
}

export default {
	createOwner,
	updateOwner,
	getAllOwner,
	getOwner,
	updateOwnerStatus,
	getExistOwnerAndLocalization,
}
