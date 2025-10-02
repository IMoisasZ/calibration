import React, { useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import styles from './Login.module.css'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	return (
		<Container
			title='Login'
			classNameContainer={styles.container}>
			<Form classNameForm={styles.form}>
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
				<span>
					Não tem uma conta? <a href='#'>Clique aqui</a> e crie a sua!
				</span>
			</Form>
		</Container>
	)
}
