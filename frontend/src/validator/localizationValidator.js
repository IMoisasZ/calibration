function createUpdateLocalizationValidator(dataLocalization) {
	if (!dataLocalization) {
		throw new Error('Dados não informados!')
	}
	if (
		!dataLocalization.description ||
		dataLocalization.description.trim() === ''
	) {
		throw new Error('A descrição da localização é obrigatória!')
	}
	return true
}

export { createUpdateLocalizationValidator }
