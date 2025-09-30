function createUpdateEquipmentTypeValidator(dataEquipmentType) {
	if (!dataEquipmentType) {
		throw new Error('Dados não informados!')
	}
	if (
		!dataEquipmentType.equipment_type ||
		dataEquipmentType.equipment_type.trim() === ''
	) {
		throw new Error('O tipo de equipamento é obrigatório!')
	}
	return true
}

export { createUpdateEquipmentTypeValidator }
