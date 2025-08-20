/** @format */

import { body, param, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/errorMiddleware.js'

const createLocalizationValidate = [
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
	(req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map((error) => error.msg)

			return res
				.status(400)
				.json({ message: defaultMessage, errors: errorMessages })
		}
		next()
	},
]

const updateLocalizationValidate = [
	param('id')
		.notEmpty()
		.withMessage('Id não informado!')
		.isNumeric()
		.withMessage(`O valor deve ser numerico!`),
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
	(req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map((error) => error.msg)

			return res
				.status(400)
				.json({ message: defaultMessage, errors: errorMessages })
		}
	},
]

const getLocalizationValidate = [
	param('id')
		.notEmpty()
		.withMessage('Id não informado!')
		.isNumeric()
		.withMessage(`O valor deve ser numerico!`),
	(req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map((error) => error.msg)

			return res
				.status(400)
				.json({ message: defaultMessage, errors: errorMessages })
		}
	},
]

const updateLocalizationStatusValidate = [
	param('id')
		.notEmpty()
		.withMessage('Id não informado!')
		.isNumeric()
		.withMessage(`O valor deve ser numerico!`),
	body('active')
		.notEmpty()
		.withMessage('Active não informada!')
		.isBoolean()
		.withMessage('A informação deve ser do tipo boolean!'),
	(req, res) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map((error) => error.msg)

			return res
				.status(400)
				.json({ message: defaultMessage, errors: errorMessages })
		}
	},
]

export {
	createLocalizationValidate,
	updateLocalizationValidate,
	getLocalizationValidate,
	updateLocalizationStatusValidate,
}
