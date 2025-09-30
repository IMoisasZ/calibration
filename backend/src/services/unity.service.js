import UnityRepository from '../repositories/unity.repository.js'
import { BadRequestError, NotFoundError } from '../errors/customErrors.error.js'
import { UnityAlreadyAdded } from '../errors/unity.error.js'
import { UniqueConstraintError } from 'sequelize'

async function existUnityById(id) {
	if (!id) {
		throw new BadRequestError(`ID não informado!`)
	}

	const unity = await UnityRepository.getUnity(id)

	if (!unity) {
		throw new NotFoundError(`Não existe uma unidade com ID ${id}`)
	}

	return unity
}

async function createUnity(unity) {
	try {
		return await UnityRepository.createUnity(unity)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new UnityAlreadyAdded(
				`A unidade ${unity.description} - ${unity.tag} já foi cadastrada!`
			)
		}
		throw error
	}
}

async function updateUnity(id, unity) {
	await existUnityById(id)
	try {
		return await UnityRepository.updateUnity(id, unity)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new UnityAlreadyAdded(
				`A unidade ${unity.description} - ${unity.tag} já foi cadastrada!`
			)
		}
	}
}

async function getAllUnity(status) {
	if (status === 'true') {
		return await UnityRepository.getAllUnity({ active: true })
	}
	return await UnityRepository.getAllUnity({})
}

async function getUnity(id) {
	return await existUnityById(id)
}

async function updateUnityStatus(id, active) {
	await existUnityById(id)

	return await UnityRepository.updateUnityStatus(id, active)
}

export default {
	createUnity,
	updateUnity,
	getAllUnity,
	getUnity,
	updateUnityStatus,
}
