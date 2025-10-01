import LocalizationService from '../services/localization.service.js'

async function createLocalization(req, res, next) {
	try {
		const localization = req.body

		res
			.status(201)
			.send(await LocalizationService.createLocalization(localization))

		const loggerMessage = `POST - /localization - ${JSON.stringify(
			localization
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateLocalization(req, res, next) {
	try {
		const { id } = req.params
		const localization = req.body

		res
			.status(200)
			.send(await LocalizationService.updateLocalization(id, localization))

		const loggerMessage = `PUT - /localization/:id=${id} - ${JSON.stringify(
			localization
		)}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getAllLocalization(req, res, next) {
	try {
		const { status } = req.query
		res.status(200).send(await LocalizationService.getAllLocalization(status))

		const loggerMessage = `GET - /localization - All localizations`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function getLocalization(req, res, next) {
	try {
		const { id } = req.params
		res.status(200).send(await LocalizationService.getLocalization(id))

		const loggerMessage = `GET - /localization/:id=${id}`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

async function updateLocalizationStatus(req, res, next) {
	try {
		const { id } = req.params
		const { active } = req.body
		res
			.status(200)
			.send(await LocalizationService.updateLocalizationStatus(id, active))

		const loggerMessage = active
			? `GET - /localization/:id=${id} - active=${active} - Localization was enabled`
			: `GET - /localization/:id=${id} - active=${active} - Localization was disabled`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	createLocalization,
	updateLocalization,
	getAllLocalization,
	getLocalization,
	updateLocalizationStatus,
}
