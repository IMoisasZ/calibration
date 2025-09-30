function createUpdateUnityValidator(dataUnity) {
	if (!dataUnity) {
		throw new Error('Dados não informados!')
	}
	if (!dataUnity.description || dataUnity.description.trim() === '') {
		throw new Error('A descrição da unidade é obrigatória!')
	}
	if (!dataUnity.tag || dataUnity.tag.trim() === '') {
		throw new Error('A tag da unidade é obrigatória!')
	}
	return true
}

export { createUpdateUnityValidator }
