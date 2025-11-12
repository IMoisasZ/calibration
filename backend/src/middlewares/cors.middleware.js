/** @format */

import cors from 'cors'
import 'dotenv/config'

/**
 * @fileoverview Configures and exports the CORS middleware for the application.
 * It enforces a whitelist of allowed origins defined in the CLIENT_URL environment variable.
 *
 * @module CorsMiddleware
 * @requires cors
 */

/**
 * @typedef {import('cors').CorsOptions} CorsOptions
 * @typedef {function(Error | null, boolean): void} Callback
 */

/**
 * @const {CorsOptions} corsOptions
 * @description Configuration object for the CORS middleware, enabling a dynamic whitelist policy.
 */
const corsOptions = {
	/**
	 * @description Custom origin function to check if the requesting domain is allowed.
	 * Allowed origins are fetched from the CLIENT_URL environment variable (comma-separated).
	 * @param {string | undefined} origin - The origin of the request, or undefined for non-browser requests.
	 * @param {Callback} callback - The callback function to signal if the origin is allowed.
	 */
	origin: (origin, callback) => {
		/** @description -> Search the allow URL into the .env (could be a string separated to semicolumn) */
		const allowedOrigins = process.env.CLIENT_URL
			? process.env.CLIENT_URL.split(',')
			: []

		/** @description -> 2. Verify if the require origin is on the list. */
		if (!origin) return callback(null, true)

		/** @description -> 2. Verify if the require origin is on the list. */
		if (allowedOrigins.includes(origin)) {
			callback(null, true) // Allow request
		} else {
			/** @description -> Reject the require, returning an error of CORS */
			/** @description -> Use a strinf to the error, that going to be care for our errorMiddlware. */
			callback(new Error(`Not allowed by CORS - Origin: ${origin}`))
		}
	},
	/**
	 * @type {string}
	 * @description Specifies the HTTP methods allowed for CORS requests.
	 */
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',

	/**
	 * @type {boolean}
	 * @description Indicates whether cross-origin requests should include user credentials (e.g., cookies, authorization headers).
	 */
	credentials: true,

	/**
	 * @type {number}
	 * @description Sets the HTTP status code for successful OPTIONS preflight requests.
	 */
	optionsSuccessStatus: 204,
}

/**
 * @constant {import('express').RequestHandler} corsMiddleware
 * @description The configured CORS middleware handler, ready to be used in the Express application.
 */
const corsMiddleware = cors(corsOptions)

export default corsMiddleware
