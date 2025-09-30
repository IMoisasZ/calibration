import UnityService from '../services/unity.service.js'

const routeName = '/unity'
async function createUnity(req, res, next) {
	try {
		const unity = req.body
		const newUnity = await UnityService.createUnity(unity)
		res.status(201).send(newUnity)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(newUnity)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateUnity(req, res, next) {
	try {
		const { id } = req.params
		const unity = req.body
		const unityChange = await UnityService.updateUnity(id, unity)
		res.status(200).send(unityChange)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(unity)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllUnity(req, res, next) {
	try {
		const { status } = req.query
		const unity = await UnityService.getAllUnity(status)
		res.status(200).send(unity)
		const loggerMessage = `GET - ${routeName}?status=${status}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getUnity(req, res, next) {
	try {
		const { id } = req.params
		const unity = await UnityService.getUnity(id)
		res.status(200).send(unity)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateUnityStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const unity = await UnityService.updateUnityStatus(id, active)
		res.status(200).send(unity)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${
			active ? 'Unity was Enabled' : 'Unity was disabled'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createUnity,
	updateUnity,
	getAllUnity,
	getUnity,
	updateUnityStatus,
}
