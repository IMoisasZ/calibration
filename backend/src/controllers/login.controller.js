import LoginService from '../services/login.service.js'

async function login(req, res, next) {
	try {
		const { email, password } = req.body
		const newLogin = await LoginService.login(email, password)
		res.set('Authorization', `Bearer ${newLogin.token}`)
		res.status(200).send(newLogin)
		const loggerMessage = `POST - /login - ${email} - Created token`
		logger.info(loggerMessage)
	} catch (error) {
		next(error)
	}
}

export default {
	login,
}
