import toast from 'react-hot-toast'

/**
 * @description -> Creates a toast message dynamically based on type.
 * @param {string} type - The type of toast ('success', 'error', 'loading', 'warn', 'info', etc.).
 * @param {string} message - The message to be displayed.
 */
export function createMessage(type = 'success', message = '') {
	// Valida se a mensagem existe para evitar toasts vazios
	if (!message) {
		return
	}

	switch (type) {
		case 'success':
			toast.success(message)
			break

		case 'error':
			toast.error(message)
			break

		case 'loading':
			toast.loading(message)
			break

		case 'warn':
			toast(message, {
				style: {
					backgroundColor: '#fffbe6', // Cor de fundo amarela clara
					color: '#b78009', // Cor do texto amarela escura
					border: '1px solid #ffcc00', // Borda amarela
				},
				icon: '⚠️',
			})
			break

		case 'info':
			toast(message, {
				style: {
					backgroundColor: '#e6f7ff', // Cor de fundo azul claro
					color: '#00529b', // Cor do texto azul escuro
					border: '1px solid #b3e0ff', // Borda azul
				},
				icon: 'ℹ️',
			})
			break

		default:
			// Fallback para tipos inválidos ou desconhecidos
			toast.error('Ocorreu um erro interno. Tipo de toast inválido.')
			console.error(`O tipo de toast "${type}" não é válido.`)
			break
	}
}

export function defaultErrorMessage(error) {
	console.log({ error })
	const errorMessage =
		error.response?.data?.errors ||
		error.message ||
		'Ocorreu um erro desconhecido!'
	createMessage('error', errorMessage)
}
