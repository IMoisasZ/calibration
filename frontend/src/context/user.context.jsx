// src/context/UserContext.js

import React, { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMessage, defaultErrorMessage } from '../utils/message.utils'
// ✅ Importa as funções com um alias para evitar conflito
import {
	login as loginService,
	logout as logoutService,
	getStoredUser,
} from '../services/login.service'
import { loginValidator } from '../validator/login.validator'
// Importe seu serviço de API autenticado (se estiver usando Axios ou fetch customizado)

// 1. Criação do Contexto
// Passamos um valor padrão que pode ser null, mas com a estrutura das funções
const UserContext = createContext({
	user: null,
	isLogged: false,
	login: async () => {},
	logout: () => {},
})

// 2. Criação do Provider (Onde a lógica vive)
function UserProvider({ children }) {
	// Inicializa o estado com o usuário armazenado localmente
	const [user, setUser] = useState(getStoredUser())
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// ✅ Se getStoredUser for síncrona, basta chamá-la.
		const storedUser = getStoredUser()

		setUser(storedUser)
		setLoading(false)

		// Se getStoredUser for ACIDENTALMENTE async, use:
		// storedUser.then(data => { setUser(data); setLoading(false); });
	}, [])

	// Função de Login do Contexto (chama o serviço)
	async function login(email, password) {
		try {
			// ✅ Chama a função de serviço renomeada
			loginValidator(email, password)
			const userData = await loginService(email, password)

			setUser(userData) // Atualiza o estado global
			createMessage('success', 'Login realizado com sucesso!')

			return userData // Retorna os dados para quem chamou (ex: para redirecionar)
		} catch (error) {
			defaultErrorMessage(error)
			throw error // Propaga o erro para o componente que chamou
		}
	}

	// Função de Logout do Contexto
	function logout() {
		logoutService() // Remove do localStorage
		setUser(null) // Limpa o estado
		createMessage('info', 'Sessão encerrada.')
	}

	// Efeito para checar a sessão na montagem do componente (evita piscar a tela)
	useEffect(() => {
		// Se já houver um usuário no estado (carregado do localStorage),
		// a sessão está ativa.
		if (user) {
			// Aqui você pode adicionar uma lógica para validar o token se necessário
			// (ex: decodificar o token e checar a expiração)
		}
		setLoading(false)
	}, [user])

	const contextValue = {
		user,
		isLogged: !!user, // Booleano: true se user não for null
		login,
		logout,
		loading, // Útil para mostrar uma tela de "carregando" inicial
	}

	// 3. Renderiza o Provider
	return (
		<UserContext.Provider value={contextValue}>
			{/* O loading garante que nada será renderizado até que a checagem da sessão termine */}
			{!loading && children}
		</UserContext.Provider>
	)
}

// 4. Hook Customizado para Consumo (prática recomendada)
const useUser = () => useContext(UserContext)

// Exportações
export { UserProvider, useUser }
