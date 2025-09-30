import {
	CalibrationModel,
	CalibrationResultModel,
	EquipmentModel,
	EquipmentTypeModel,
	LocalizationModel,
	OwnerModel,
	UnityModel,
	CalibrationAnalysisModel,
} from '../models/__index.js'
import CalibrationPeriodicity from '../models/calibration_periodicity.model.js'

async function createCalibration(calibration) {
	const { id } = await CalibrationModel.create(calibration)
	return await getCalibration(id)
}

async function updateCalibration(id, calibration) {
	const instanceCalibration = await getCalibration(id)

	Object.assign(instanceCalibration, calibration)
	await instanceCalibration.save()
	return await getCalibration(id)
}

async function getAllCalibrations(whereClause) {
	return await CalibrationModel.findAll({
		where: whereClause,
		include: [
			{
				model: EquipmentModel,
				include: [
					{
						model: OwnerModel,
					},
					{
						model: EquipmentTypeModel,
					},
				],
			},
			{
				model: CalibrationResultModel,
			},
			{
				model: CalibrationAnalysisModel,
			},
		],
	})
}

async function getAllCalibrationsIsAnalysis() {
	return await CalibrationModel.findAll({
		include: [
			{
				model: EquipmentModel,
				include: [
					{
						model: OwnerModel,
						include: [
							{
								model: LocalizationModel,
							},
						],
					},
					{
						model: EquipmentTypeModel,
					},
					{
						model: UnityModel,
					},
					{
						model: CalibrationPeriodicity,
					},
				],
			},
			{
				model: CalibrationResultModel,
			},
			{
				model: CalibrationAnalysisModel,
			},	
		],
	})
}

async function getCalibration(id, transaction) {
	return await CalibrationModel.findByPk(id, { transaction })
}

async function deleteCalibration(id) {
	const deleted = await CalibrationModel.destroy({ where: { id } })
	return deleted > 0
}

// calibration with calibration_result
async function createCalibrationWithResults(
	calibration,
	calibrationResult,
	transaction
) {
	const newCalibration = await CalibrationModel.create(calibration, {
		transaction,
	})

	const resultsToCreate = calibrationResult.map((result) => ({
		...result,
		calibration_id: newCalibration.id,
	}))
	await CalibrationResultModel.bulkCreate(resultsToCreate, { transaction })

	return newCalibration
}

async function patchCalibrationByCalibrationAnalysis(is_analysis, id) {
	return await CalibrationModel.update(
		{ is_analysis },
		{
			where: {
				id,
			},
		}
	)
}

export default {
	createCalibration,
	updateCalibration,
	getAllCalibrations,
	getAllCalibrationsIsAnalysis,
	getCalibration,
	deleteCalibration,
	createCalibrationWithResults,
	patchCalibrationByCalibrationAnalysis,
}
