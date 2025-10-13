/** @format */

import winston from 'winston'

/**@description -> Destructuring variables from process.env */
const { FILENAME, LABEL } = process.env

// Format for Development (simple text, readable by human eyes)
const devFormat = winston.format.printf(
	({ level, message, label, timestamp }) => {
		return `${timestamp} [${label}] ${level}: ${message}`
	}
)

// Format for Production (JSON, readable by machines/log aggregators)
const prodFormat = winston.format.json()

// Select the format based on the environment
const selectedFormat =
	process.env.NODE_ENV === 'production' ? prodFormat : devFormat

const transports = [
	// File transport is active in both environments, using the FILENAME from .env
	new winston.transports.File({ filename: FILENAME }),
]

// Only add Console Transport in Development for local debugging
if (process.env.NODE_ENV === 'development') {
	transports.push(new winston.transports.Console())
}

const logger = winston.createLogger({
	// Set log level: silly/debug in dev, info/warn in production
	level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',

	// Define transports (File always, Console only in dev)
	transports: transports,

	// Apply common format logic
	format: winston.format.combine(
		winston.format.label({ label: LABEL }), // Add custom label (from .env)
		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Standardize timestamp
		selectedFormat // Apply the selected format (text or JSON)
	),
})

export default logger
