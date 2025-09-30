/** @format */

import { param, body } from 'express-validator'
import { validationResult } from '../utils/validationResult.utils.js'

/**@description -> Reusable the function for param ID */
const localizationParamValidation = [
	param('id')
		.notEmpty()
		.withMessage('Id não informado!')
		.isNumeric()
		.withMessage(`O valor deve ser numerico!`),
]

/**@description -> Reusable the function for body description and active */
const localizationBodyValidation = [
	body('description')
		.notEmpty()
		.withMessage('Descrição não informada!')
		.isString()
		.withMessage('Deve ser informado como texto'),
	body('active')
		.notEmpty()
		.withMessage('Active não informada!')
		.isBoolean()
		.withMessage('A informação deve ser do tipo boolean!'),
]

const createLocalizationValidate = [
	...localizationBodyValidation,
	validationResult(),
]

const updateLocalizationValidate = [
	...localizationParamValidation,
	...localizationBodyValidation,
	validationResult(),
]

const getLocalizationValidate = [
	...localizationParamValidation,
	validationResult(),
]

const updateLocalizationStatusValidate = [
	...localizationParamValidation,
	body('active')
		.notEmpty()
		.withMessage('Active não informada!')
		.isBoolean()
		.withMessage('A informação deve ser do tipo boolean!'),
	validationResult(),
]

export {
	createLocalizationValidate,
	updateLocalizationValidate,
	getLocalizationValidate,
	updateLocalizationStatusValidate,
}
