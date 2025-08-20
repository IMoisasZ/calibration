import { CustomError } from '../errors/customErrors.error.js'

const errorMiddleware = (err, req, res, next) => {
	/**@description -> Using for errors created (specify errors) */
	if (err instanceof CustomError) {
		global.logger.error(
			`${err.status} - ${req.method} ${req.baseUrl} - ${err.message}`
		)
		return res.status(err.status).send({ errors: err.message })
	}

	/**@description -> To others errors don't have preview */
	global.logger.error(`500 - ${req.method} ${req.baseUrl} - ${err.message}`)
	return res.status(500).send({ errors: 'Internal Server Error' })
}

export default errorMiddleware
