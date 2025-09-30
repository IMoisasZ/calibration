import OwnerRepository from '../repositories/owner.repository.js'
import { BadRequestError, NotFoundError } from '../errors/customErrors.error.js'

async function existOwnerById(id) {
	if (!id) {
		throw new BadRequestError(`ID não informado!`)
	}

	const owner = await OwnerRepository.getOwner(id)
	if (!owner) {
		throw new NotFoundError(`Proprietario com id ${id} não encontrado!`)
	}
	return owner
}

async function existOwnerAndLocalization(owner, localization_id) {
	if (!owner || !localization_id) {
		throw new BadRequestError(
			`O proprietário e a localização devem ser informados!`
		)
	}

	const data = await OwnerRepository.getExistOwnerAndLocalization(
		owner,
		localization_id
	)

	if (data && data.length === 0) {
		return true /**@description -> Return that don't have owner and localization_id already included. In this case data could be included. */
	}
	throw new BadRequestError(
		`O proprietario e a localização já foram incluidos!`
	)
}

async function createOwner(owner) {
	await existOwnerAndLocalization(owner.owner, owner.localization_id)
	return await OwnerRepository.createOwner(owner)
}

async function updateOwner(id, owner) {
	await existOwnerById(id)
	await existOwnerAndLocalization(owner.owner, owner.localization_id)

	return await OwnerRepository.updateOwner(id, owner)
}

async function getAllOwner(status) {
	if (status === 'true') {
		return await OwnerRepository.getAllOwner({ active: true })
	}
	return await OwnerRepository.getAllOwner({})
}

async function getOwner(id) {
	return await existOwnerById(id)
}

async function updateOwnerStatus(id, active) {
	await existOwnerById(id)

	return await OwnerRepository.updateOwnerStatus(id, active)
}

export default {
	createOwner,
	updateOwner,
	getAllOwner,
	getOwner,
	updateOwnerStatus,
}
