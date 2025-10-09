/** @format */

import cors from 'cors'
import 'dotenv/config'

/**
 * Config the whitelist for CORS.
 * Allow only origins definided on enviriomental variable CLIENT_URL.
 */
const corsOptions = {
	/** @description -> Search the allow URL into the .env (could be a string separated to semicolumn) */
	origin: (origin, callback) => {
		const allowedOrigins = process.env.CLIENT_URL
			? process.env.CLIENT_URL.split(',')
			: []

		/** @description -> 1. Allow tools without origin like (Postman, Insomnia, scripts backend) */
		if (!origin) return callback(null, true)

		/** @description -> 2. Verify if the require origin is on the list. */
		if (allowedOrigins.includes(origin)) {
			callback(null, true) // Permite
		} else {
			/** @description -> Reject the require, returning an error of CORS */
			/** @description -> Use a strinf to the error, that going to be care for our errorMiddlware. */
			callback(new Error(`Not allowed by CORS - Origin: ${origin}`))
		}
	},
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
	optionsSuccessStatus: 204,
}

/**@description -> Export the middleware configured. */
const corsMiddleware = cors(corsOptions)

export default corsMiddleware
