import LocalizationModel from './localization.model.js'

async function syncModels() {
	LocalizationModel.sync()
}

syncModels()

export { LocalizationModel }
