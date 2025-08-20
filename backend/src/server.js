import app from './app.js'
import dbConnection from './connection/db.connection.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3333

try {
	await dbConnection.authenticate()
	console.warn('Connection has been established successfully.')
	app.listen(PORT, () => console.warn(`SERVER RUNNING ON PORT ${PORT}`))
} catch (error) {
	console.error('Unable to connect to the database:', error)
	process.exit(1)
}
