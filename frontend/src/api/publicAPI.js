// src/services/publicAPI.js (Novo Arquivo)
import axios from 'axios'

// Esta API NÃO TERÁ o interceptor de token
export const publicAPI = axios.create({
	baseURL: 'http://localhost:3001/',
	timeout: 5000,
})
