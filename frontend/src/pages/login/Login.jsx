/** @format */

import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import styles from './Login.module.css'
import { useUser } from '../../context/user.context'
import { defaultErrorMessage } from '../../utils/message.utils'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()

	const { login } = useUser()

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			await login(email, password)
			navigate('/home')
		} catch (error) {
			defaultErrorMessage(error)
		}
	}

	return (
		<Container
			title='Login'
			classNameContainer={styles.container}>
			<Form
				classNameForm={styles.form}
				handleSubmit={handleSubmit}>
				<Input
					type='email'
					name='email'
					labelName='Email'
					value={email}
					handleChange={(e) => setEmail(e.currentTarget.value)}
				/>
				<Input
					type='password'
					name='password'
					labelName='Senha'
					value={password}
					handleChange={(e) => setPassword(e.currentTarget.value)}
				/>
				<Button
					nameBtn='Login'
					type='subimit'
					title='Clique para fazer login!'
				/>
				<span>Não tem uma conta? Fale com o setor da qualidade!</span>
			</Form>
		</Container>
	)
}
