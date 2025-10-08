import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { UnauthorizedError } from '../errors/customErrors.error.js' // Assumindo que você tem um erro 401

export const verifyToken = (req, res, next) => {
	// 1. Obter o cabeçalho de Autorização
	const authHeader = req.headers.authorization

	if (!authHeader) {
		// 401 Unauthorized se o cabeçalho estiver faltando
		return next(new UnauthorizedError('Token de autenticação não fornecido.'))
	}

	// 2. Extrair o Token (espera-se o formato "Bearer [token]")
	const parts = authHeader.split(' ')

	if (parts.length !== 2 || parts[0] !== 'Bearer') {
		return next(
			new UnauthorizedError('Formato de token inválido. Use: Bearer [token].')
		)
	}

	const token = parts[1]

	// 3. Verificar e Decodificar o Token
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		// 4. Anexar o ID do usuário à requisição (para uso no Controller/Service)
		// O nome 'req.userId' é uma convenção comum.
		req.userId = decoded.id

		// 5. Seguir para o próximo middleware/controller
		next()
	} catch (err) {
		// Falha na verificação (token expirado, inválido, assinatura incorreta)
		return next(new UnauthorizedError('Token inválido ou expirado.'))
	}
}

// Opcional: Você pode querer buscar o usuário completo no DB aqui,
// mas geralmente é mais performático apenas usar o ID.
