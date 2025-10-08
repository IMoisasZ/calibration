export function loginValidator(email, password) {
	if (!email) {
		throw new Error(`Email não informado!`)
	}

	if (!password) {
		throw new Error(`Senha não informada!`)
	}
}
