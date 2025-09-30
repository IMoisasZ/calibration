import OwnerService from '../services/owner.service.js'

const routeName = '/owner'

async function createOwner(req, res, next) {
	try {
		const owner = req.body
		const newOwner = await OwnerService.createOwner(owner)
		res.status(201).send(newOwner)
		const loggerMessage = `POST - ${routeName} - ${JSON.stringify(owner)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateOwner(req, res, next) {
	try {
		const { id } = req.params
		const owner = req.body
		const alterOwner = await OwnerService.updateOwner(id, owner)
		res.status(200).send(alterOwner)
		const loggerMessage = `PUT - ${routeName}/${id} - ${JSON.stringify(owner)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllOwner(req, res, next) {
	try {
		const { status } = req.query
		const owner = await OwnerService.getAllOwner(status)
		res.status(200).send(owner)
		const loggerMessage = `GET - ${routeName}?status=${status}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getOwner(req, res, next) {
	try {
		const { id } = req.params
		const owner = await OwnerService.getOwner(id)
		res.status(200).send(owner)
		const loggerMessage = `GET - ${routeName}/${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateOwnerStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		const owner = await OwnerService.updateOwnerStatus(id, active)
		res.status(200).send(owner)
		const loggerMessage = `PATCH - ${routeName}/${id} - ${
			active ? 'Owner enabled' : 'Owner disabled'
		}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createOwner,
	updateOwner,
	getAllOwner,
	getOwner,
	updateOwnerStatus,
}
