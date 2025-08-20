/** @format */
function validationResult(defaultMessage = 'Dados inválidos!') {
	return (req, res, next) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			const errorMessages = errors.array().map((error) => error.msg)
			throw new BadRequestError(errorMessages.join('; '))
		}
		next()
	}
}
