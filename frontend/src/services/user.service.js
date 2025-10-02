import { API } from '../api/API'

const routeName = 'user'

async function createUser(user) {
	const { data } = await API.post(`${routeName}`, user)
	return data
}

async function updateUser(user) {
	const { id } = user
	delete user.id
	const { data } = await API.put(`${routeName}/${id}`, user)
	return data
}

async function getAllUsers(active = 'true') {
	const { data } = await API.get(`${routeName}?active=${active}`)
	return data
}

async function getUser(id) {
	const { data } = await API.get(`${routeName}/${id}`)
	return data
}

async function getUserByEmail(email) {
	const { data } = await API.get(`${routeName}/user?email=${email}`)
	return data
}

async function patchUserDisableEnable(id, active) {
	const { data } = API.patch(`${routeName}/${id}`, { active })
	return data
}

export {
	createUser,
	updateUser,
	getAllUsers,
	getUser,
	getUserByEmail,
	patchUserDisableEnable,
}
