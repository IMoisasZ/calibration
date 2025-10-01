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

async function existOwnerAndLocalization(ownerName, localization_id) {
	if (!ownerName || !localization_id) {
		throw new BadRequestError(
			`O proprietário e a localização devem ser informados!`
		)
	}

	const data = await OwnerRepository.getExistOwnerAndLocalization(
		ownerName,
		localization_id
	)

	// CORREÇÃO DA LÓGICA:
	// Se o array 'data' tem algum elemento (data.length > 0), a combinação já existe!
	if (data && data.length > 0) {
		throw new BadRequestError(
			`O proprietario '${ownerName}' e a localização (ID: ${localization_id}) já foram incluidos juntos!`
		)
	}

	// Se o código chegou até aqui, significa que a combinação NÃO EXISTE no banco de dados.
	// Retornamos true (ou simplesmente encerramos a função) para sinalizar que é seguro prosseguir.
	return true
}

async function createOwner(owner) {
	await existOwnerAndLocalization(owner.owner, owner.localization_id)
	return await OwnerRepository.createOwner(owner)
}

async function updateOwner(id, owner) {
	const p = await existOwnerById(id)

	const r = await existOwnerAndLocalization(
		owner.owner,
		owner.localization_id,
		id
	)

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
