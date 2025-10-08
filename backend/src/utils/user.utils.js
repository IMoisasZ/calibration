import { hashSync, compareSync } from 'bcrypt'

export function hashPassword(password, saltRounds = 10) {
	const passwordHashed = hashSync(password, saltRounds)
	return passwordHashed
}

export function comparePassword(passedPassword, passwordHashed) {
	return compareSync(passedPassword, passwordHashed)
}
