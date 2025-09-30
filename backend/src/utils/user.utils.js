import { hashSync } from 'bcrypt'

export function hashPassword(password, saltRounds = 10) {
	const passwordHashed = hashSync(password, saltRounds)
	return passwordHashed
}
