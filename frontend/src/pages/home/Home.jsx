import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/container/Container'
import Button from '../../components/button/Button'
import styles from './Home.module.css'

export default function Home() {
	const navigate = useNavigate()
	return (
		<Container classNameContainer={styles.container}>
			<h1>Calibração</h1>
			<Button
				nameBtn='Login'
				title='Clique para ir para login'
				type='button'
				handleClick={() => navigate('/login')}
			/>
		</Container>
	)
}
