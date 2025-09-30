import UserRepository from '../repositories/user.repository.js'
import {
	BadRequestError,
	NotFoundError,
	AlreadyAdded,
} from '../errors/customErrors.error.js'
import { UniqueConstraintError } from 'sequelize'

async function existUserById(id) {
	if (!id) {
		throw new BadRequestError(`ID não informado!`)
	}
	const user = await UserRepository.getUser(id)
	if (!user) {
		throw new NotFoundError(`Usuário com ID ${id} não encontrado!`)
	}

	return user
}

function removePassword(data) {
	if (!data) {
		return null
	}

	if (Array.isArray(data)) {
		// Mapeia e remove a senha de cada item
		return data.map((item) => {
			const { password, ...userWithoutPassword } = item.toJSON()

			return userWithoutPassword
		})
	}
	const { password, ...userWithoutPassword } = data.toJSON()

	return userWithoutPassword
}

async function createUser(user) {
	try {
		const data = await UserRepository.createUser(user)
		return removePassword(data)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(`O email ${user.email} já foi cadastrado!`)
		}
		throw error
	}
}

async function updateUser(id, user) {
	await existUserById(id)

	try {
		const data = await UserRepository.updateUser(id, user)
		return removePassword(data)
	} catch (error) {
		if (error instanceof UniqueConstraintError) {
			throw new AlreadyAdded(`O email ${user.email} já foi cadastrado!`)
		}
		throw error
	}
}

async function getAllUsers(active) {
	let data
	if (active === 'true') {
		data = await UserRepository.getAllUsers({ active: true })
		return removePassword(data)
	}
	data = await UserRepository.getAllUsers({})
	return removePassword(data)
}

async function getUser(id) {
	const data = await existUserById(id)

	return removePassword(data)
}

async function patchUserDisableEnable(id, active) {
	await existUserById(id)

	const data = await UserRepository.patchUserDisableEnable(id, active)
	return removePassword(data)
}

export default {
	createUser,
	updateUser,
	getAllUsers,
	getUser,
	patchUserDisableEnable,
}
