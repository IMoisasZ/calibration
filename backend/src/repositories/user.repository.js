/** @format */

import { UserModel } from '../models/__index.js'

async function createUser(user) {
	return await UserModel.create(user)
}

async function updateUser(id, user) {
	const instanceUser = await getUser(id)

	// 1. Lógica para Senha (Se a senha estiver sendo atualizada)
	if (user.password) {
		// A. Se a senha nova for diferente da senha existente (sempre será, pois é hash vs plaintext),
		// ou se não houver senha existente, o 'set' irá marcá-la como alterada.

		// 🚨 NOVO: Use .set() para a senha e depois remova-a do objeto de atualização
		// Isso garante que o setter da senha do Sequelize seja ativado primeiro.
		instanceUser.set('password', user.password)
		delete user.password
	}

	// Object.assign(instanceUser, user)
	instanceUser.set(user)

	await instanceUser.save()
	return await instanceUser
}

async function getAllUsers(whereClause) {
	return await UserModel.findAll({
		where: whereClause,
	})
}

async function getUser(id) {
	return await UserModel.findByPk(id)
}

async function getUserByEmail(email) {
	try {
		return await UserModel.findOne({
			where: {
				email,
			},
		})
	} catch (error) {
		console.log(error)
		return null
	}
}

async function patchUserDisableEnable(id, active) {
	await UserModel.update(
		{ active },
		{
			where: {
				id,
			},
		}
	)
	return await getUser(id)
}

export default {
	createUser,
	updateUser,
	getAllUsers,
	getUser,
	getUserByEmail,
	patchUserDisableEnable,
}
