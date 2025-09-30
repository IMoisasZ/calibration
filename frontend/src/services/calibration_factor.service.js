export async function getActualCalibrationFactor() {
	// Atraso simulado para imitar uma chamada de rede
	await new Promise((resolve) => setTimeout(resolve, 100))

	// Retorna o fator padrão que estava sendo usado antes
	return 2
}
