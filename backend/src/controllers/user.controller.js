import UserService from '../services/user.service.js'

const pathName = '/user'

async function createUser(req, res, next) {
	try {
		const user = req.body
		const newUser = await UserService.createUser(user)
		res.status(201).send(newUser)
		const loggerMessage = `POST - ${pathName} - ${JSON.stringify(newUser)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateUser(req, res, next) {
	try {
		const { id } = req.params
		const user = req.body
		const alterUser = await UserService.updateUser(id, user)
		res.status(200).send(alterUser)
		const loggerMessage = `PUT - ${pathName}/${id} - ${JSON.stringify(
			alterUser
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllUsers(req, res, next) {
	try {
		const { active } = req.query
		const user = await UserService.getAllUsers(active)
		res.status(200).send(user)
		const loggerMessage = `GET - ${pathName}?active=${active}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getUser(req, res, next) {
	try {
		const { id } = req.params
		const user = await UserService.getUser(id)
		res.status(200).send(user)
		const loggerMessage = `GET - ${pathName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getUserByEmail(req, res, next) {
	try {
		const { email } = req.query
		const user = await UserService.getUserByEmail(email)
		res.status(200).send(user)
		const loggerMessage = `GET - ${pathName}/user?email=${email}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function patchUserDisableEnable(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const user = await UserService.patchUserDisableEnable(id, active)
		res.status(200).send(user)
		const loggerMessage = `PATCH - ${pathName}/${id} - ${
			active ? 'User was enabled' : 'User was disabled'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createUser,
	updateUser,
	getAllUsers,
	getUser,
	getUserByEmail,
	patchUserDisableEnable,
}
