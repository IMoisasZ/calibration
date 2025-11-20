/** @format */

import {
	CalibrationModel,
	CalibrationResultModel,
	EquipmentModel,
	EquipmentTypeModel,
	LocalizationModel,
	OwnerModel,
	UnityModel,
	CalibrationAnalysisModel,
	CalibrationConfigModel,
	UserModel,
} from '../models/__index.js'
import CalibrationPeriodicity from '../models/calibration_periodicity.model.js'

/**
 * @typedef {import('sequelize').Model} CalibrationInstance
 * @typedef {import('sequelize').Model} CalibrationResultInstance
 * @typedef {object} CalibrationData
 * @property {number} user_id - Foreign key linking to the User who performed or registered the calibration.
 * @property {number} equipment_id - Foreign key linking to the Equipment that was calibrated.
 * @property {Date} calibration_date - The date on which the calibration was performed.
 * @property {Date} next_due_date - The calculated date for the next calibration due.
 * @property {string} certificate_number - The unique identifier of the calibration certificate.
 * @property {string} calibration_status - The overall status (e.g., 'CONCLUIDO', 'EM ANDAMENTO').
 * @property {boolean} is_analysis - Flag indicating if the calibration has been officially analyzed.
 * // ... other properties from the Calibration model
 */

/**
 * @typedef {object} CalibrationResultData
 * @property {number} [calibration_id] - The ID of the parent Calibration (added internally in bulkCreate).
 * @property {string} status_result - The technical status result (e.g., 'APROVADO', 'REPROVADO').
 * // ... other properties from the CalibrationResult model
 */

/**
 * Creates a new Calibration event record and returns the complete instance.
 *
 * @async
 * @param {CalibrationData} calibration - The data payload for the new calibration record.
 * @returns {Promise<CalibrationInstance>} The newly created Calibration instance.
 */
async function createCalibration(calibration) {
	const { id } = await CalibrationModel.create(calibration)
	return await getCalibration(id)
}

/**
 * Updates an existing Calibration event record.
 * Uses `Object.assign` to apply all payload properties to the fetched instance before saving.
 *
 * @async
 * @param {number} id - The ID of the Calibration record to update.
 * @param {CalibrationData} calibration - The updated data payload.
 * @returns {Promise<CalibrationInstance>} The updated Calibration instance.
 */
async function updateCalibration(id, calibration) {
	const instanceCalibration = await getCalibration(id)

	Object.assign(instanceCalibration, calibration)
	await instanceCalibration.save()
	return await getCalibration(id)
}

/**
 * Retrieves a list of Calibration records with essential, nested associations (Eager Loading).
 * Includes Equipment (with Owner and EquipmentType), CalibrationResult, and CalibrationAnalysis.
 *
 * @async
 * @param {object} [whereClause={}] - Optional Sequelize `where` clause for filtering.
 * @returns {Promise<Array<CalibrationInstance>>} An array of Calibration instances with associated data.
 */
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

/**
 * Retrieves a highly detailed list of all Calibration records for analysis purposes.
 * Includes deep associations like Equipment (with Owner, Localization, Unity, Periodicity),
 * CalibrationResult (with Config), CalibrationAnalysis (with User), and the main User.
 *
 * @async
 * @returns {Promise<Array<CalibrationInstance>>} An array of Calibration instances with extensive associated data.
 */
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
				include: [
					{
						model: CalibrationConfigModel,
					},
				],
			},
			{
				model: CalibrationAnalysisModel,
				include: [
					{
						model: UserModel,
					},
				],
			},
			{
				model: UserModel,
			},
		],
	})
}

/**
 * Finds a single Calibration record by its primary key (ID).
 * Accepts an optional transaction object to be used within a transactional scope.
 *
 * @async
 * @param {number} id - The primary key ID of the record to find.
 * @param {object} [transaction] - A Sequelize transaction object.
 * @returns {Promise<CalibrationInstance|null>} The Calibration instance or null if not found.
 */
async function getCalibration(id, transaction) {
	return await CalibrationModel.findByPk(
		id,
		{ transaction },
		{
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
					include: [
						{
							model: CalibrationConfigModel,
						},
					],
				},
				{
					model: CalibrationAnalysisModel,
					include: [
						{
							model: UserModel,
						},
					],
				},
				{
					model: UserModel,
				},
			],
		}
	)
}

/**
 * Deletes a Calibration record by its ID.
 *
 * @async
 * @param {number} id - The ID of the record to delete.
 * @returns {Promise<boolean>} True if the record was deleted, false otherwise.
 */
async function deleteCalibration(id) {
	const deleted = await CalibrationModel.destroy({ where: { id } })
	return deleted > 0
}

/**
 * Creates a Calibration record and associated CalibrationResult records in a single transactional block.
 * Uses `bulkCreate` for efficient insertion of multiple results.
 *
 * @async
 * @param {CalibrationData} calibration - The data payload for the parent calibration.
 * @param {Array<CalibrationResultData>} calibrationResult - An array of results to associate with the new calibration.
 * @param {object} transaction - A mandatory Sequelize transaction object.
 * @returns {Promise<CalibrationInstance>} The newly created Calibration instance.
 */
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

/**
 * Updates the 'is_analysis' flag on a Calibration record.
 * This is an efficient direct update query (patch) without loading the full instance.
 *
 * @async
 * @param {boolean} is_analysis - The new value for the analysis status flag.
 * @param {number} id - The ID of the Calibration record to update.
 * @returns {Promise<[number]>} A promise that resolves to an array containing the number of affected rows (usually [1]).
 */
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

/**
 * @module CalibrationRepository
 * @description Repository for handling all CRUD and complex association queries related to the Calibration model.
 */
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
