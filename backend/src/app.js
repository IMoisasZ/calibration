import express from 'express'
import cors from 'cors'
import winston from 'winston'
import errorMiddleware from './middlewares/errorMiddleware.js'
import { configDotenv } from 'dotenv'
configDotenv()

/**@description -> Import routes */
import { LocalizationRoutes } from './routes/__index.route.js'

const { FILENAME, LABEL } = process.env

const app = express()

app.use(express.json())
app.use(cors())

/**@description -> Routes */
app.use('/localization', LocalizationRoutes)

/**@description -> Log (winston) */
const { combine, timestamp, label, printf } = winston.format
const myformat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level} ${message}`
})
global.logger = winston.createLogger({
	level: 'silly',
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: FILENAME }),
	],
	format: combine(label({ label: LABEL }), timestamp(), myformat),
})

app.use(errorMiddleware)

export default app
