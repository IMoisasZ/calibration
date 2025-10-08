/** @format */

import { hash, compare } from 'bcrypt'
import userRepository from '../repositories/user.repository.js'
import { userDefault } from '../data/user_default.data.js'

async function hashPassword(password, saltRounds = 10) {
	const passwordHashed = await hash(password, saltRounds)
	return passwordHashed
}

async function comparePassword(passedPassword, passwordHashed) {
	return await compare(passedPassword, passwordHashed)
}

async function createUserDefault() {
	try {
		const existUserByEmail = await userRepository.getUserByEmail(
			userDefault.email
		)

		if (existUserByEmail) {
			return console.warn('User default created with success!', {
				email: userDefault.email,
				password: userDefault.password,
			})
		}

		const newUser = { ...userDefault }

		newUser.password = await hashPassword(userDefault.password)

		await userRepository.createUser(newUser)
		return console.warn('User default created with success!', {
			email: userDefault.email,
			password: userDefault.password,
		})
	} catch (error) {
		console.error(error)
		throw new Error('Erro ao criar usuário padrão', error)
	}
}

export { createUserDefault, hashPassword, comparePassword }
