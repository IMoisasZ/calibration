/** @format */

import UserRepository from '../repositories/user.repository.js'
import { BadRequestError } from '../errors/customErrors.error.js'
import { comparePassword } from '../utils/user.utils.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

async function login(email, password) {
	if (!email) {
		throw new BadRequestError(`Email não informado!`)
	}

	const user = await UserRepository.getUserByEmail(email)

	const genericError = new BadRequestError(`Email ou senha incorretos!`)

	if (!user) {
		throw genericError
	}

	if (!password) {
		throw new BadRequestError(`Senha não informada!`)
	}

	if (!comparePassword(password, user.password)) {
		throw genericError
	}

	// 1. Definir o PAYLOAD do Token
	// Inclua o mínimo necessário para identificar o usuário.
	const payload = {
		id: user.id,
		email: user.email,
	}

	// 2. Gerar o Token
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: '7d', // Token expira em 7 dias
	})

	// 3. Retornar o Token e dados básicos do usuário (para o frontend usar)
	return {
		token: token,
		user: {
			id: user.id,
			email: user.email,
			name: user.user_name, // Assumindo que 'user.name' existe
			role: user.role,
		},
	}
}

export default {
	login,
}
