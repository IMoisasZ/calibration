import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/container/Container'
import Button from '../../components/button/Button'
import styles from './User.module.css'

export default function UserMenu() {
	const navigate = useNavigate()

	return (
		<Container
			title='Configuraçoes'
			classNameContainer={styles.container_user_menu}>
			<div>
				<Button
					type='button'
					nameBtn='Usuarios'
					title='Clique para ver os usários ou criar um!'
					handleClick={() => navigate('/user')}
				/>
				<Button
					type='button'
					nameBtn='Configurações'
					title='Clique para abrir as configurações do sistema!'
					handleClick={() => navigate('/calibration_config')}
				/>
			</div>
		</Container>
	)
}
