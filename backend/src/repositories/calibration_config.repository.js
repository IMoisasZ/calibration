import dbConnection from '../connection/db.connection.js'
import { CalibrationConfigModel } from '../models/__index.js'

async function createCalibrationConfig(calibrationConfig, options = {}) {
	return await CalibrationConfigModel.create(calibrationConfig, options)
}

async function updateCalibrationConfigToNoActualAndCreate(calibrationConfig) {
	const t = await dbConnection.transaction()

	try {
		await CalibrationConfigModel.update(
			{ actual: false },
			{
				where: {
					actual: true,
				},
				transaction: t,
			}
		)
		const newCalibrationConfig = await createCalibrationConfig(
			calibrationConfig,
			{ transaction: t }
		)
		await t.commit()
		return newCalibrationConfig
	} catch (error) {
		t.rollback()
		throw error
	}
}

async function getAllCalibrationConfig(whereClause) {
	return await CalibrationConfigModel.findAll({
		where: whereClause,
		order: [['createdAt', 'DESC']],
		limit: 5,
	})
}

async function getCalibrationConfig(id) {
	return await CalibrationConfigModel.findByPk(id)
}

export default {
	updateCalibrationConfigToNoActualAndCreate,
	getAllCalibrationConfig,
	getCalibrationConfig,
}
