/** @format */

/**
 * @fileoverview Route aggregator module.
 * This file imports all individual route files for the API and exports them
 * for easy mounting in the main application file (e.g., server.js).
 *
 * @module RoutesIndex
 * @exports {object} all API route modules
 */
import UserRoutes from './user.route.js'
import LocalizationRoutes from './localization.route.js'
import UnityRoutes from './unity.route.js'
import EquipmentTypeRoutes from './equipment_type.route.js'
import OwnerRoutes from './owner.route.js'
import CalibrationPeriodicityRoutes from './calibration_periodicity.route.js'
import EquipmentRoutes from './equipment.route.js'
import CalibrationRoutes from './calibration.route.js'
import CalibrationResultRoutes from './calibration_result.route.js'
import CalibrationConfigRoutes from './calibration_config.route.js'
import CalibrationAnalysisRoutes from './calibration_analysis.route.js'
import LoginRoutes from './login.route.js'

export {
	UserRoutes,
	LocalizationRoutes,
	UnityRoutes,
	EquipmentTypeRoutes,
	OwnerRoutes,
	CalibrationPeriodicityRoutes,
	EquipmentRoutes,
	CalibrationRoutes,
	CalibrationResultRoutes,
	CalibrationConfigRoutes,
	CalibrationAnalysisRoutes,
	LoginRoutes,
}
