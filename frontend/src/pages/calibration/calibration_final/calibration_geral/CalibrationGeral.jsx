/** @format */

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Container from '../../../../components/container/Container'
import Button from '../../../../components/button/Button'
import Divider from '../../../../components/divider/Divider'
import styles from './CalibrationGeral.module.css'

export default function CalibrationGeral() {
	const location = useLocation()
	const dataLocation = location.state

	const navigate = useNavigate()

	if (!dataLocation) {
		return (
			<Container title='Informações da calibração'>
				<p>Nenhum dado de calibração encontrado. Volte e tente novamente.</p>
			</Container>
		)
	}

	const calibrationResults = dataLocation.calibration_results || []
	const calibrationAnalysis = dataLocation.calibration_analyses || []

	const factor = calibrationResults[0].calibration_config.factor

	console.log(dataLocation)

	return (
		<Container
			title='Informações da calibração'
			classNameContainer={styles.container}>
			<section className={styles.equipment}>
				<div className={styles.div_h4_h3}>
					<h4>Instrumento:</h4>
					<div>
						<p>Status da Calibração: </p>
						<h3
							className={
								dataLocation.calibration_status === 'EM ANALISE'
									? styles.analysis
									: dataLocation.calibration_status === 'APROVADO'
									? styles.approved
									: styles.reproved
							}>
							{dataLocation.calibration_status}
						</h3>
					</div>
				</div>
				<div className={styles.div_data_equipment}>
					<p>
						Identificação: <span>{dataLocation.equipment.identifier}</span>
					</p>
					<p>
						Tipo de equipamento:{' '}
						<span>{dataLocation.equipment.equipment_type.equipment_type}</span>
					</p>
					<p>
						Descrição: <span>{dataLocation.equipment.description}</span>
					</p>
					<p>
						Divisão:{' '}
						<span>
							{dataLocation.equipment.division}{' '}
							{dataLocation.equipment.unity.tag.toLowerCase()}
						</span>
					</p>
					<p>
						Capacidade:{' '}
						<span>
							{dataLocation.equipment.min_capacity} até{' '}
							{dataLocation.equipment.max_capacity}{' '}
							{dataLocation.equipment.unity.tag.toLowerCase()}
						</span>
					</p>
					<p>
						Proprietário: <span>{dataLocation.equipment.owner.owner}</span>
					</p>
					<p>
						Localização:{' '}
						<span>{dataLocation.equipment.owner.localization.description}</span>
					</p>
				</div>
			</section>

			<section className={styles.calibration}>
				<h4>Calibração:</h4>
				<div className={styles.div_data_calibration}>
					<p>
						Data da Calibração: <span>{dataLocation.calibration_date}</span>
					</p>
					<p>
						Próxima da Calibração: <span>{dataLocation.next_calibration}</span>
					</p>
					<p>
						Numero do certificado:{' '}
						<a
							href={`http://localhost:3001/${dataLocation.certificate_file}`}
							target='_blank'
							rel='noreferrer'>
							{dataLocation.certificate_number}
						</a>
					</p>
				</div>
			</section>

			<section className={styles.calibration_result}>
				<h4>Resultados da calibração:</h4>
				<span className={styles.unity}>
					Unidade de Medida: {dataLocation.equipment.unity.tag.toLowerCase()}
				</span>
				<div className={styles.div_main_calibration_result}>
					{calibrationResults?.map((item) => {
						return (
							<div className={styles.div_calibration_result}>
								<div className={styles.div_result}>
									<span>Faixa de medição: </span>
									<p>{item.measuring_range}</p>
								</div>
								<div className={styles.div_result}>
									<span>Resolução ideal: </span>
									<p>{item.optimal_resolution}</p>
								</div>
								<div className={styles.div_result}>
									<span>Identificação ok? </span>
									<p>{item.identifier ? 'Sim' : 'Não'}</p>
								</div>
								<div className={styles.div_result}>
									<span>Condições ambientais ok? </span>
									<p>{item.environmental_conditions ? 'Sim' : 'Não'}</p>
								</div>
								<div className={styles.div_result}>
									<span>Maior desvio: </span>
									<p>{item.biggest_deviation}</p>
								</div>
								<div className={styles.div_result}>
									<span>Incerteza da medição: </span>
									<p>{item.measurement_uncertainty}</p>
								</div>
								<div className={styles.div_result}>
									<span>MD+IM: </span>
									<p>{item.biggest_deviation_plus_measurement_uncertainty}</p>
								</div>
								<div className={styles.div_result}>
									<span>Status: </span>
									<p
										className={
											item.status_result === 'APROVADO'
												? styles.status_approved
												: styles.status_reproved
										}>
										{item.status_result}
									</p>
								</div>
							</div>
						)
					})}
				</div>
				<span>
					Obs. Para o calculo da resolução ideal, foi utilizado o fator {factor}
				</span>
			</section>

			<section className={styles.calibration_analysis}>
				<h4>Analise da calibração:</h4>
				{calibrationAnalysis.length !== 0 ? (
					calibrationAnalysis.map((item) => (
						<div className={styles.data_calibration_analysis}>
							<div>
								<p>
									Data da Analise:{' '}
									<span>{new Date(item.createdAt).toLocaleDateString()}</span>
								</p>
								<p>
									Status da analise: <span>{item.decision_status}</span>
								</p>
							</div>

							<p>
								Analise: <span>{item.notes}</span>
							</p>

							<p>
								Analisado por:{' '}
								{calibrationAnalysis[0].user.user_name.toUpperCase()}
							</p>
						</div>
					))
				) : dataLocation.calibration_status === 'REPROVADO' ? (
					<p className={styles.has_not_data_analysis}>
						EQUIPAMENTO INAPTO PARA USO!
					</p>
				) : (
					<p className={styles.has_not_data_analysis}>
						EQUIPAMENTO APTO PARA USO!
					</p>
				)}
			</section>
			<Divider />
			<div className={styles.btns}>
				<Button
					nameBtn='Remover calibração'
					type='button'
					title='Clique para remover a calibração todos os dados referentes a ela!'
					classNameButton={styles.remove}
				/>
				<Button
					nameBtn='Voltar par ao plano de claibração!'
					type='button'
					title='Clique para voltar ao plano de calibração!'
					handleClick={() => navigate('/calibration_final_list')}
				/>
			</div>
		</Container>
	)
}
