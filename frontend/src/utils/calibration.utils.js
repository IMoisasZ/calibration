// Arquivo: calibration.utils.js

export function nextCalibrationFunction(dateString, daysToAdd) {
	// 🛑 CORREÇÃO 1: Valida se a data existe e é uma string antes de chamar .split()
	if (!dateString || typeof dateString !== 'string') {
		console.error(
			'nextCalibrationFunction: Data de calibração inválida ou ausente.'
		)
		return ''
	}

	// 🛑 CORREÇÃO 2: Assume que a data de entrada está no formato YYYY-MM-DD (padrão do seu estado e input)
	// Se a data estiver em YYYY-MM-DD, a ordem é [YYYY, MM, DD].
	const [year, month, day] = dateString.split('-')

	// Cria um objeto Date: new Date(year, monthIndex, day)
	// Subtrair 1 do mês é crucial porque o JavaScript Date usa índice 0-11 para meses.
	const newDate = new Date(year, month - 1, day)

	// 3. Adiciona os dias
	newDate.setDate(newDate.getDate() + Number(daysToAdd))

	// 4. Formata a data de saída para YYYY-MM-DD
	const newYear = newDate.getFullYear()
	const newMonth = (newDate.getMonth() + 1).toString().padStart(2, '0')
	const newDay = newDate.getDate().toString().padStart(2, '0')

	return `${newYear}-${newMonth}-${newDay}`
}

export function mdIm(md, im) {
	// Tenta converter para número, usando 0 se for vazio ou não puder ser convertido
	const numMd = Number(md) || 0
	const numIm = Number(im) || 0

	// Se ambos forem 0 (o que significa que os campos estão vazios ou não são números válidos),
	// retorna uma string vazia para limpar o campo de resultado.
	if (numMd === 0 && numIm === 0) {
		return ''
	}

	// Retorna a soma como número.
	// O React cuidará da conversão para string no campo de input.
	return (numMd + numIm).toFixed(4)
}

export function statusResultCalibration(optimal_resolution, mdIm) {
	const valueOptimalResolution = Number(optimal_resolution) || 0
	const valueMdIm = Number(mdIm) || 0

	if (valueOptimalResolution === 0 || valueMdIm === 0) {
		return ''
	}

	if (mdIm > valueOptimalResolution) {
		return 'REPROVADO'
	}
	return 'APROVADO'
}

export function calculateOptimalResolution(acceptance_criteria, factor = 2) {
	console.log(factor)

	const valueAcceptanceCriteria = Number(acceptance_criteria) || 0

	if (valueAcceptanceCriteria === 0) {
		return ''
	}

	return (valueAcceptanceCriteria / Number(factor)).toFixed(4)
}

export function calculateCalibrationStatus(results) {
	if (!results || results.length === 0) {
		return ''
	}

	const statuses = results.map((r) => r.status_result)
	console.log(statuses)

	const hasReprovado = statuses.includes('REPROVADO')
	const hasAprovado = statuses.includes('APROVADO')

	// 1. Caso de Mix (Aprovado E Reprovado) - PRIORIDADE 1
	if (hasAprovado && hasReprovado) {
		return 'EM ANALISE'
	}

	// 2. Todos Reprovados? (Apenas Reprovados, mas sem Aprovado)
	// Usamos hasReprovado porque já sabemos que não é um mix.
	if (hasReprovado) {
		return 'REPROVADO'
	}

	// 3. Se não há Reprovado, e há algum resultado, é porque todos são Aprovados.
	if (hasAprovado) {
		return 'APROVADO'
	}

	// Fallback: não deveria acontecer se o array não for vazio, mas é seguro.
	return ''
}

/**
 * Determina o status do prazo de uma data alvo em relação à data atual (hoje).
 * * @param {Date | string | number} dataAlvo A data limite que será verificada.
 * @returns {{
 * status: 'vencido' | 'proximo a vencer' | 'no prazo',
 * diasRestantes: number
 * }}
 */
export function verifyNextCalibration(dataAlvo) {
	// 1. Definição das constantes e datas em milissegundos
	const hojeMs = new Date().getTime()
	const alvoMs = new Date(dataAlvo).getTime()

	const UM_DIA_EM_MS = 1000 * 60 * 60 * 24
	const TRINTA_DIAS_EM_MS = 30 * UM_DIA_EM_MS

	// 2. Cálculo da diferença (dataAlvo - hoje)
	const diferencaMs = alvoMs - hojeMs

	// 3. Determinação do status e dias restantes
	let status = ''
	let leftDays = Math.ceil(diferencaMs / UM_DIA_EM_MS) // Arredonda para cima para contagem de prazo

	// --- Lógica de Status ---

	// 1. VENCIDO: Se a data já passou (diferença negativa)
	if (diferencaMs < 0) {
		status = 'VENCIDO'
		leftDays = 0
	}
	// 2. PRÓXIMO A VENCER: Se faltarem 30 dias ou menos (e ainda não venceu)
	else if (diferencaMs <= TRINTA_DIAS_EM_MS) {
		status = 'PROXIMO A VENCER'
	}
	// 3. NO PRAZO: Se faltarem mais de 30 dias
	else {
		status = 'NO PRAZO'
	}

	return {
		status,
		leftDays, // Quantos dias inteiros faltam (0 se estiver vencido)
	}
}
