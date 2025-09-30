import app from './app.js'
import dbConnection from './connection/db.connection.js'
import { syncModels } from './models/__index.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3333

try {
	/**@description -> Connection with database */
	await dbConnection.authenticate()
	console.warn('Connection has been established successfully.')

	/**@description -> Sync the models with database */
	await syncModels()
	console.warn('The models are sync with database!')

	/**@description -> Start the server */
	app.listen(PORT, () => console.warn(`SERVER RUNNING ON PORT ${PORT}`))
} catch (error) {
	console.error('Unable to connect to the database:', error)
	process.exit(1)
}
