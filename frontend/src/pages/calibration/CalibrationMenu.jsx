import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../components/container/Container'
import Button from '../../components/button/Button'
import styles from './Calibration.module.css'

export default function CalibrationMenu() {
	const navigate = useNavigate()
	return (
		<Container title='Menu Calibração'>
			<div className={styles.container_menu_calibration}>
				<Button
					nameBtn='Calibração'
					type='button'
					handleClick={() => navigate('/calibration')}
				/>
				<Button
					nameBtn='Analise das calibrações'
					type='button'
					handleClick={() => navigate('/calibration_analysis_list')}
				/>
				<Button
					nameBtn='Lista das calibrações'
					type='button'
					handleClick={() => navigate('/calibration_final_list')}
				/>
			</div>
		</Container>
	)
}
