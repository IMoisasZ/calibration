import UserModel from './user.model.js'
import LocalizationModel from './localization.model.js'
import EquipmentTypeModel from './equipment_type.model.js'
import UnityModel from './unity.model.js'
import OwnerModel from './owner.model.js'
import CalibrationPeriodicityModel from './calibration_periodicity.model.js'
import EquipmentModel from './equipment.model.js'
import CalibrationModel from './calibration.model.js'
import CalibrationResultModel from './calibration_result.model.js'
import CalibrationConfigModel from './calibration_config.model.js'
import CalibrationAnalysisModel from './calibration_analysis.model.js'

async function syncModels() {
	return Promise.all([
		UserModel.sync(),
		LocalizationModel.sync(),
		EquipmentTypeModel.sync(),
		UnityModel.sync(),
		OwnerModel.sync(),
		CalibrationPeriodicityModel.sync(),
		EquipmentModel.sync(),
		CalibrationModel.sync(),
		CalibrationResultModel.sync(),
		CalibrationConfigModel.sync(),
		CalibrationAnalysisModel.sync(),
	])
}

export {
	UserModel,
	syncModels,
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
