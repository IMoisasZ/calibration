import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../../components/container/Container'
import Button from '../../../components/button/Button'
import styles from './EquipmentMenu.module.css'

export default function EquipmentMenu() {
	const navigate = useNavigate()
	return (
		<Container title='Menu equipamento'>
			<div className={styles.container_btn}>
				<Button
					classNameButton={styles.btn}
					nameBtn='Tipo de equipamento'
					type='button'
					handleClick={() => navigate('/equipment_type')}
				/>
				<Button
					classNameButton={styles.btn}
					nameBtn='Unidades de medida'
					type='button'
					handleClick={() => navigate('/unity')}
				/>
				<Button
					classNameButton={styles.btn}
					nameBtn='Periodicidade de calibração'
					type='button'
					handleClick={() => navigate('/calibration_periodicity')}
				/>
				<Button
					classNameButton={styles.btn}
					nameBtn='Equipamento'
					type='button'
					handleClick={() => navigate('/equipment')}
				/>
			</div>
		</Container>
	)
}
