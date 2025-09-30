import express from 'express'
import cors from 'cors'
import path from 'node:path'
import errorMiddleware from './middlewares/errorMiddleware.js'
import loggerConfig from './logger/logger_config.logger.js'
import { configDotenv } from 'dotenv'
configDotenv()

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
} from './routes/__index.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const UPLOAD_DIR = path.resolve(process.cwd(), 'src', 'uploads')
app.use('/uploads', express.static(UPLOAD_DIR))

/**@description -> Routes */
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

/**@description -> Log (winston) */
global.logger = loggerConfig

app.use(errorMiddleware)

export default app
