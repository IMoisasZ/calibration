/** @format */

/**
 * @fileoverview Configures and initializes a Winston logger instance for the application.
 * The logger uses different formats (text vs. JSON) and transport configurations (console vs. file)
 * based on the environment (development vs. production).
 *
 * @module Logger
 * @requires winston
 */
import winston from 'winston'

/**@description -> Destructuring variables from process.env */
const { FILENAME, LABEL } = process.env

/**
 * @description Format function for Development environment logs.
 * Produces a human-readable text output.
 * @type {winston.Logform.Format}
 */
const devFormat = winston.format.printf(
	({ level, message, label, timestamp }) => {
		return `${timestamp} [${label}] ${level}: ${message}`
	}
)

/**
 * @description Format for Production environment logs.
 * Produces a machine-readable JSON output for log aggregators.
 * @type {winston.Logform.Format}
 */
const prodFormat = winston.format.json()

/**
 * @description Selects the appropriate log format based on the NODE_ENV.
 * @type {winston.Logform.Format}
 */
const selectedFormat =
	process.env.NODE_ENV === 'production' ? prodFormat : devFormat

/**
 * @description Array of transports (output destinations) for the logger.
 * A File transport is always included.
 * @type {winston.transport[]}
 */
const transports = [
	// File transport is active in both environments, using the FILENAME from .env
	new winston.transports.File({ filename: FILENAME }),
]

// Only add Console Transport in Development for local debugging
if (process.env.NODE_ENV === 'development') {
	transports.push(new winston.transports.Console())
}

/**
 * @constant {winston.Logger} logger
 * @description The configured Winston logger instance.
 * @property {string} level - Log level is set to 'silly' (lowest) in development and 'info' in production.
 * @property {winston.transport[]} transports - List of transports (File always, Console in dev).
 * @property {winston.Logform.Format} format - Combines label, timestamp, and the environment-specific format.
 */
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
