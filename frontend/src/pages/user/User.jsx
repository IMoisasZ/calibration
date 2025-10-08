import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Select from '../../components/select/Select'
import Button from '../../components/button/Button'
import UserList from './UserList'
import { createMessage, defaultErrorMessage } from '../../utils/message.utils'
import { USER_ROLES } from '../../data/user_role.data'
import {
	userCreateValidator,
	userUpdateValidator,
} from '../../validator/user.validator'
import { createUser, updateUser } from '../../services/user.service'
import styles from './User.module.css'

export default function User() {
	const [id, setId] = useState('')
	const [userName, setUserName] = useState('')
	const [role, setRole] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [active, setActive] = useState(true)
	const [showListUser, setShowListUser] = useState(true)

	const navigate = useNavigate()
	useEffect(() => {
		const token = localStorage.getItem('userToken')
		const { role } = JSON.parse(localStorage.getItem('userData'))
		if (!token) {
			navigate('/login')
		}

		if (role !== 'MASTER') {
			navigate('/')
			createMessage('error', 'Você não pode acessar essa pagina!')
		}
	}, [navigate])

	function handleOnEdit(row) {
		setId(row.id)
		setUserName(row.user_name)
		setEmail(row.email)
		setRole(row.role)
		setActive(row.active)
		setPassword('')
		setConfirmPassword('')
		setShowListUser(false)
	}

	function handleClear() {
		setId('')
		setUserName('')
		setEmail('')
		setRole('')
		setPassword('')
		setConfirmPassword('')
		setActive(true)
	}

	function handleListUsers() {
		handleClear()
		setShowListUser(true)
	}

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const user = {
				id,
				user_name: userName,
				role,
				email,
				password,
				confirm_password: confirmPassword,
				active,
			}
			if (!id) {
				userCreateValidator(user)
				const { id, ...newUser } = user
				await createUser(newUser)
				createMessage('success', 'Usuário incluído com sucesso!')
				setShowListUser(true)
			} else {
				userUpdateValidator(user)
				const { password, ...alterUser } = user
				await updateUser(alterUser)
				createMessage('success', 'Usuário alterado com sucesso!')
				setShowListUser(true)
			}
		} catch (error) {
			defaultErrorMessage(error)
		}
	}

	if (showListUser) {
		return (
			<UserList
				handleOnEdit={handleOnEdit}
				setShowListUser={setShowListUser}
			/>
		)
	} else {
		return (
			<Container
				title='Usuário'
				classNameContainer={styles.container}>
				<Form
					handleSubmit={handleSubmit}
					classNameForm={styles.form}>
					<Input
						labelName='Nome'
						type='text'
						name='userName'
						value={userName?.toUpperCase()}
						handleChange={(e) => setUserName(e.currentTarget.value)}
					/>
					<Select
						label='Tipo de usuario'
						options={USER_ROLES}
						labelKey='role'
						valueKey='value'
						value={role}
						handleChange={(e) => setRole(e.currentTarget.value)}
						defaultName='Selecione o tipo de regra do usuário...'
					/>
					<Input
						labelName='Email'
						type='email'
						value={email?.toLocaleLowerCase()}
						name='email'
						handleChange={(e) => setEmail(e.currentTarget.value)}
					/>
					<Input
						labelName='Senha'
						type='password'
						name='password'
						value={password}
						handleChange={(e) => setPassword(e.currentTarget.value)}
					/>
					<Input
						labelName='Confirmar senha'
						type='password'
						name='confirmPassword'
						value={confirmPassword}
						handleChange={(e) => setConfirmPassword(e.currentTarget.value)}
					/>
					<Input
						labelName='Ativo'
						type='checkbox'
						name='active'
						checked={active}
						handleChange={() => setActive(!active)}
						classNameContainerInput={styles.checkbox}
					/>
					<div className={styles.container_btns}>
						<Button
							type='submit'
							title={
								id
									? 'Clique para incluir o usuário!'
									: 'Clique para editar o usuário!'
							}
							nameBtn={!id ? 'Incluir' : 'Editar'}
							classNameButton={styles.btn}
						/>
						<Button
							type='button'
							title='Clique para limpar os campos!'
							nameBtn='Limpar'
							classNameButton={styles.btn}
							handleClick={handleClear}
						/>
						<Button
							type='button'
							title='Clique para ver a lista de usuários!'
							nameBtn='Lista de usuários'
							classNameButton={styles.btn}
							handleClick={handleListUsers}
						/>
					</div>
				</Form>
			</Container>
		)
	}
}
