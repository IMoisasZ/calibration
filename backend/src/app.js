/** @format */

/**
 * @fileoverview Main application setup file for the Express API server.
 * This module configures essential middleware (security, parsing), static file serving,
 * global logging, and sets up all application routes and the global error handler.
 *
 * @module App
 * @requires express
 * @requires cors
 * @requires path
 * @requires dotenv
 * @requires loggerConfig
 * @requires errorMiddleware
 * @requires corsMiddleware
 * @requires routes
 */

/**@description -> Imports */
import express from 'express'
// import cors from 'cors'
import path from 'node:path'
import errorMiddleware from './middlewares/errorMiddleware.js'
import loggerConfig from './logger/logger_config.logger.js'
import corsMiddleware from './middlewares/cors.middleware.js'
import i18n from './config/i18n.config.js'
import { configDotenv } from 'dotenv'

/**@description -> Import routes */
import {
	UserRoutes,
	LocalizationRoutes,
	EquipmentTypeRoutes,
	UnityRoutes,
	OwnerRoutes,
	CalibrationPeriodicityRoutes,
	EquipmentRoutes,
	CalibrationRoutes,
	CalibrationResultRoutes,
	CalibrationConfigRoutes,
	CalibrationAnalysisRoutes,
	LoginRoutes,
} from './routes/__index.route.js'

// Load environment variables from .env file
configDotenv()

/**@description ->  Creating the variable app*/
const app = express()

/**@description -> Using libraries */

// Parse JSON body
app.use(express.json())

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }))

// Apply custom CORS policy
app.use(corsMiddleware)

app.use(i18n.init)

/**@description ->  Config the path to get the certificates and put into the folder uploads*/

// Resolve the absolute path to the uploads directory
const UPLOAD_DIR = path.resolve(process.cwd(), 'src', 'uploads')

// Serve files from the uploads directory under the /uploads URL path
app.use('/uploads', express.static(UPLOAD_DIR))

/**@description -> Routes mapping */
app.use('/user', UserRoutes)
app.use('/localization', LocalizationRoutes)
app.use('/equipment_type', EquipmentTypeRoutes)
app.use('/unity', UnityRoutes)
app.use('/owner', OwnerRoutes)
app.use('/calibration_periodicity', CalibrationPeriodicityRoutes)
app.use('/equipment', EquipmentRoutes)
app.use('/calibration', CalibrationRoutes)
app.use('/calibration_result', CalibrationResultRoutes)
app.use('/calibration_config', CalibrationConfigRoutes)
app.use('/calibration_analysis', CalibrationAnalysisRoutes)
app.use('/login', LoginRoutes)

/**@description -> Log (winston) */

// Set up the Winston logger instance globally for easy access
global.logger = loggerConfig

/**@description -> Middleware error global */

// The global error handler must be the last middleware loaded to catch all thrown errors
app.use(errorMiddleware)

export default app
