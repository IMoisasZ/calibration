function createUpdateOwnerValidator(dataOwner) {
	if (!dataOwner) {
		throw new Error('Dados não informados!')
	}
	if (!dataOwner.owner || dataOwner.owner.trim() === '') {
		throw new Error('O prorpietário é obrigatório!')
	}
	if (!dataOwner.localization_id) {
		throw new Error('A localização é obrigatória!')
	}
	return true
}

export { createUpdateOwnerValidator }
