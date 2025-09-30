import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../../components/container/Container'
import Button from '../../../components/button/Button'
import { getAllCalibrations } from '../../../services/calibration.service'
import styles from './CalibrationAnalysis.module.css'

export default function CalibrationAnalysisList() {
	const [status, setStatus] = useState('EM ANALISE')
	const [listCalibration, setListCalibration] = useState([])

	const navigate = useNavigate()

	const BASE_URL = 'http://localhost:3001'

	useEffect(() => {
		async function loadCalibration() {
			const data = await getAllCalibrations(status)

			setListCalibration(data)
		}
		loadCalibration()
	}, [status])

	function handleAnalysisCalibration(calibration) {
		navigate(`/calibration_analysis_definition`, { state: calibration })
	}
	return (
		<Container
			title='Analise das calibrações'
			classNameContainer={styles.container}>
			<div className={styles.container_card}>
				{listCalibration?.map((calibration) => {
					return (
						<div
							className={styles.card}
							title={calibration.equipment.description}>
							<h4>
								Tipo de Instrumento:
								{calibration.equipment.equipment_type.equipment_type}
							</h4>
							<h4 className={styles.truncate}>
								Identificação: {calibration.equipment.identifier}
							</h4>
							<h4 className={styles.truncate}>
								Descrição: {calibration.equipment.description}
							</h4>
							<p>
								Data da calibração:{' '}
								{new Date(calibration.calibration_date).toLocaleDateString()}
							</p>
							<p>
								Proxima calibração:{' '}
								{new Date(calibration.next_calibration).toLocaleDateString()}
							</p>
							<p>Numero do certificado: {calibration.certificate_number}</p>

							<a
								href={`${BASE_URL}/${calibration.certificate_file}`}
								target='_blank'
								rel='noopener noreferrer'>
								Clique aqui para ver o certificado!
							</a>

							<div className={styles.div_status}>
								<p
									className={`${styles.status} ${
										calibration.calibration_status === 'EM ANALISE'
											? styles.analysis
											: styles.reproved
									}`}>
									Status: {calibration.calibration_status}
								</p>
							</div>

							<Button
								nameBtn='Analise da calibração'
								title='Clique para fazer a analise da calibração!'
								classNameButton={styles.btn_analysis_calibration}
								handleClick={() => handleAnalysisCalibration(calibration)}
							/>
						</div>
					)
				})}
			</div>
		</Container>
	)
}
