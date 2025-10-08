export function userCreateValidator(dataUser) {
	const { user_name, role, email, password, confirm_password } = dataUser
	if (!dataUser) {
		throw new Error('Dados do usuário não informado!')
	}

	if (!user_name || user_name.trim() === '') {
		throw new Error('Nome do usuário não informado!')
	}

	if (!role) {
		throw new Error('Tipo de usuário não informado!')
	}

	if (!email) {
		throw new Error('Email não informado!')
	}

	if (
		password &&
		password.trim() !== '' &&
		confirm_password &&
		confirm_password.trim() !== ''
	) {
		if (!password.length >= 6) {
			throw new Error('A senha deve ter no minimo 6 caracteres!')
		}

		if (password.trim() !== confirm_password.trim()) {
			throw new Error('As senhas não conferem!')
		}
	}

	return true
}

export function userUpdateValidator(dataUser) {
	const { user_name, role, email, password, confirm_password } = dataUser
	if (!dataUser) {
		throw new Error('Dados do usuário não informado!')
	}

	if (!user_name || user_name.trim() === '') {
		throw new Error('Nome do usuário não informado!')
	}

	if (!role) {
		throw new Error('Tipo de usuário não informado!')
	}

	if (!email) {
		throw new Error('Email não informado!')
	}

	return true
}
