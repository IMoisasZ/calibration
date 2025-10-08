import { publicAPI } from '../api/publicAPI'

/**
 * Tenta obter os dados do usuário do localStorage.
 * Útil para persistência de sessão.
 */
// src/services/login.service.js

function getStoredUser() {
	const userJson = localStorage.getItem('userData')
	const token = localStorage.getItem('userToken')

	// Se faltar um dos dois, sai.
	if (!userJson || !token) {
		return null
	}

	try {
		const userData = JSON.parse(userJson)

		// Garante que o objeto tem as chaves necessárias (id e name)
		if (userData && userData.id && userData.name) {
			return userData
		}
	} catch (e) {
		// Se o parse falhar, a sessão é inválida e limpa o armazenamento.
		console.error('Dados corrompidos no localStorage. Limpando.', e)
		localStorage.removeItem('userToken')
		localStorage.removeItem('userData')
	}

	return null
}

/**
 * Tenta realizar o login no backend e armazena o token.
 * @returns {object} Os dados do usuário logado (excluindo a senha).
 */
async function login(email, password) {
	const { data } = await publicAPI.post(`login`, { email, password })

	if (data.token) {
		// Salva o token JWT e os dados básicos do usuário
		localStorage.setItem('userToken', data.token)

		localStorage.setItem('userData', JSON.stringify(data.user))

		return data.user
	}

	return null
}

/**
 * Remove o token e os dados do usuário do armazenamento local.
 */
function logout() {
	localStorage.removeItem('userToken')
	localStorage.removeItem('userData')
	// Se estiver usando o Axios, você pode querer remover o header padrão aqui também.
}

export { login, logout, getStoredUser }
