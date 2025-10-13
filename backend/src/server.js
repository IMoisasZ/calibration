/** @format */

/**@description -> Imports*/
import dotenv from 'dotenv'
import path from 'node:path'

const PORT = process.env.PORT || 3333

try {
	/**@description -> 1. LOAD THE ENVIRIOMENTAL VARIABLES */
	const envFile =
		process.env.NODE_ENV === 'production'
			? '.env.production'
			: '.env.development'
	dotenv.config({ path: path.resolve(process.cwd(), envFile) })

	/**@description -> 2. AFTER, IMPORT THE MODULES DEPENDENT */
	/**@description -> Import and define the logger (winston), that depend of FILENAME and NODE_ENV. */
	const loggerConfig = await import('./logger/logger_config.logger.js').then(
		(m) => m.default
	)
	const { default: app } = await import('./app.js')
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

	/**@description -> Create the user default */
	createUserDefault()

	/**@description -> Start the server */
	app.listen(PORT, () => global.logger.info(`SERVER RUNNING ON PORT ${PORT}`)) // Usando Winston
} catch (error) {
	/**@description -> 4. TRATAMENT OF CRITICAL ERROR */
	if (global.logger) {
		global.logger.error(
			'Unable to connect to the database or start server:',
			error
		)
	} else {
		console.error('Unable to connect to the database or start server:', error)
	}

	process.exit(1) /**@description -> Finish the connection */
}
