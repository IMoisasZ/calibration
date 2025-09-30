import { UserModel } from '../models/__index.js'

async function createUser(user) {
	return await UserModel.create(user)
}

async function updateUser(id, user) {
	const instanceUser = await getUser(id)

	Object.assign(instanceUser, user)
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
	patchUserDisableEnable,
}
