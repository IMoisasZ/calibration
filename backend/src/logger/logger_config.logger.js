import winston from 'winston'
import dotenv from 'dotenv'

dotenv.config()

const { FILENAME, LABEL } = process.env
const { combine, timestamp, label, printf } = winston.format
const myformat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level} ${message}`
})

const logger = winston.createLogger({
	level: 'silly',
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: FILENAME }),
	],
	format: combine(label({ label: LABEL }), timestamp(), myformat),
})

export default logger
