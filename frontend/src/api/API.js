import axios from 'axios'

export const API = axios.create({
	baseURL: 'http://localhost:3001/',
	timeout: 5000,
})

// ✅ INTERCEPTOR DE REQUEST: Adiciona o token antes de enviar
API.interceptors.request.use(
	(config) => {
		// 1. Pega o token do localStorage
		const token = localStorage.getItem('userToken')

		// 2. Se o token existir, anexa ao cabeçalho Authorization
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	(error) => {
		console.log({ error })

		return Promise.reject(error)
	}
)
