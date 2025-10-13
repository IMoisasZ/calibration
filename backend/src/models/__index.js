/** @format */

import UserModel from './user.model.js'
import LocalizationModel from './localization.model.js'
import EquipmentTypeModel from './equipment_type.model.js'
import UnityModel from './unity.model.js'
import OwnerModel from './owner.model.js'
import CalibrationPeriodicityModel from './calibration_periodicity.model.js'
import EquipmentModel from './equipment.model.js'
import CalibrationConfigModel from './calibration_config.model.js'
import CalibrationModel from './calibration.model.js'
import CalibrationResultModel from './calibration_result.model.js'
import CalibrationAnalysisModel from './calibration_analysis.model.js'

/**
 * @fileoverview Central module for managing and synchronizing all Sequelize database models.
 * This file serves as the main export hub for all defined models and provides the synchronization logic.
 */

import UserModel from './user.model.js'
import LocalizationModel from './localization.model.js'
import EquipmentTypeModel from './equipment_type.model.js'
import UnityModel from './unity.model.js'
import OwnerModel from './owner.model.js'
import CalibrationPeriodicityModel from './calibration_periodicity.model.js'
import EquipmentModel from './equipment.model.js'
import CalibrationConfigModel from './calibration_config.model.js'
import CalibrationModel from './calibration.model.js'
import CalibrationResultModel from './calibration_result.model.js'
import CalibrationAnalysisModel from './calibration_analysis.model.js'

/**
 * Synchronizes all Sequelize models with the database sequentially.
 * This function ensures that all tables are created or updated according to the model definitions.
 * The order of synchronization is typically set to respect foreign key dependencies.
 *
 * @async
 * @throws {Error} If any model synchronization fails.
 * @returns {Promise<void>}
 */

async function syncModels() {
	try {
		await UserModel.sync(),
			await LocalizationModel.sync(),
			await EquipmentTypeModel.sync(),
			await UnityModel.sync(),
			await OwnerModel.sync(),
			await CalibrationPeriodicityModel.sync(),
			await CalibrationConfigModel.sync(),
			await EquipmentModel.sync(),
			await CalibrationModel.sync(),
			await CalibrationResultModel.sync(),
			await CalibrationAnalysisModel.sync()
	} catch (error) {
		console.error({ error })
		console.error('Erro durante a sincronização sequencial:', error)
		throw error
	}
}

/**
 * @module models
 * @description Exports all individual Sequelize models and the synchronization function.
 */

export {
	syncModels,
	UserModel,
	LocalizationModel,
	EquipmentTypeModel,
	UnityModel,
	OwnerModel,
	CalibrationPeriodicityModel,
	EquipmentModel,
	CalibrationModel,
	CalibrationResultModel,
	CalibrationConfigModel,
	CalibrationAnalysisModel,
}
