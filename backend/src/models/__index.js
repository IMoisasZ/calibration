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
		console.error('❌ Erro durante a sincronização sequencial:', error)
		throw error // Propaga o erro para o servidor poder tratá-lo/encerrar
	}
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
