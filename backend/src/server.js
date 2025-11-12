/** @format */

/**
 * @fileoverview Main entry point for the API server. This file handles environment variable loading,
 * dependency resolution, database connection/synchronization, initial data setup, and starting the Express server.
 * It uses dynamic imports to ensure modules dependent on environment variables are loaded correctly.
 *
 * @module Server
 * @requires dotenv
 * @requires path
 */
import dotenv from 'dotenv'
import path from 'node:path'

// Define the port, defaulting to 3333 if not set in environment variables
const PORT = process.env.PORT || 3333

try {
	/**@description -> 1. LOAD THE ENVIRIOMENTAL VARIABLES */

	// Determine the environment file to load based on NODE_ENV
	const envFile =
		process.env.NODE_ENV === 'production'
			? '.env.production'
			: '.env.development'
	// Load environment variables dynamically
	dotenv.config({ path: path.resolve(process.cwd(), envFile) })

	/**@description -> 2. AFTER, IMPORT THE MODULES DEPENDENT */

	/**@description -> Import and define the logger (winston), that depend of FILENAME and NODE_ENV. */

	// Dynamic import to ensure logger configuration has access to environment variables
	const loggerConfig = await import('./logger/logger_config.logger.js').then(
		(m) => m.default
	)
	const { default: app } = await import('./app.js')

	// Set logger on the app object and globally for wide accessibility
	app.set('logger', loggerConfig)
	global.logger = loggerConfig /**@description -> Define the logger global */

	/**@description -> Import modules DB and utillyts, that depend of process.env */
	const dbConnection = await import('./connection/db.connection.js').then(
		(m) => m.default
	)
	const { syncModels } = await import('./models/__index.js')
	const { createUserDefault } = await import('./utils/user.utils.js')

	/**@description -> 3. INITIALIZATION OF APPLICATION */

	/**@description -> Connection with database */
	await dbConnection.authenticate()
	global.logger.info('Connection has been established successfully.') // Usando Winston

	/**@description -> Sync the models with database */
	await syncModels()
	global.logger.info('The models are sync with database!') // Usando Winston

	/**@description -> Create the user default (idempotent operation) */
	createUserDefault()

	/**@description -> Start the server */
	app.listen(PORT, () => global.logger.info(`SERVER RUNNING ON PORT ${PORT}`)) // Usando Winston
} catch (error) {
	/**@description -> 4. TRATAMENT OF CRITICAL ERROR */
	// Log the error using the logger if initialized, otherwise use console.error as fallback
	if (global.logger) {
		global.logger.error(
			'Unable to connect to the database or start server:',
			error
		)
	} else {
		console.error('Unable to connect to the database or start server:', error)
	}

	process.exit(1) /**@description -> Finish the connection with an error code */
}
