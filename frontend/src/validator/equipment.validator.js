function createUpdateEquipmentValidator(dataEquipment) {
	if (!dataEquipment) {
		throw new Error('Dados não informados!')
	}
	if (!dataEquipment.equipment_type_id) {
		throw new Error('O tipo de equipamento é obrigatório!')
	}

	if (!dataEquipment.identifier || dataEquipment.identifier.trim() === '') {
		throw new Error('A identificação do equipamento é obrigatória!')
	}

	if (!dataEquipment.description || dataEquipment.description.trim() === '') {
		throw new Error('A descrição do equipamento é obrigatória!')
	}

	if (!dataEquipment.owner_id) {
		throw new Error('O proprietário do equipamento é obrigatório!')
	}

	if (Number(dataEquipment.division) === 0) {
		throw new Error('A divisão do equipamento é obrigatória!')
	}

	if (!dataEquipment.unity_id) {
		throw new Error('A unidade de medida do equipamento é obrigatória!')
	}

	if (!dataEquipment.min_capacity) {
		throw new Error('A capacidade minima do equipamento é obrigatória!')
	}

	if (!dataEquipment.max_capacity || Number(dataEquipment.max_capacity) === 0) {
		throw new Error(
			'A capacidade máxima do equipamento é obrigatória e não pode ser igual a 0!'
		)
	}

	if (!dataEquipment.calibration_periodicity_id) {
		throw new Error('A periodicidade de calibração é obrigatória!')
	}
	return true
}

export { createUpdateEquipmentValidator }
