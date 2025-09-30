import React from 'react'
import Divider from '../../../components/divider/Divider'
import styles from './CalibrationAnalysis.module.css'

export default function CalibrationAnalysisDataCalibration({ calibration }) {
	return (
		<div className={styles.container_data_calibration}>
			<h4>Instrumento calibrado</h4>
			<div className={styles.equipment_calibration}>
				<p>
					Tipo do equipamento:{' '}
					{calibration.equipment?.equipment_type?.equipment_type}
				</p>
				<p>Identificação: {calibration.equipment?.identifier}</p>
				<p>Descrição: {calibration.equipment?.description}</p>
				<p>Proprietário: {calibration.equipment?.owner?.owner}</p>
			</div>
			<Divider />
			<h4>Dados da calibração</h4>
			<div className={styles.data_calibration}>
				<p>
					Data da calibração:{' '}
					{new Date(calibration.calibration_date).toLocaleDateString()}
				</p>
				<p>
					Proxima da calibração:{' '}
					{new Date(calibration.next_calibration).toLocaleDateString()}
				</p>
				<p>Numero do certificado: {calibration.certificate_number}</p>

				<p
					className={`${
						calibration.calibration_status === 'EM ANALISE'
							? styles.status_analysis
							: styles.status_reproved
					}`}>
					Status da calibração: {calibration.calibration_status}
				</p>
			</div>
			<Divider />
			<h4>Resultados da calibração:</h4>
			<div className={styles.calibration_result}>
				{calibration.calibration_results?.map((item) => {
					return (
						<div className={styles.calibration_result_data}>
							<div className={styles.result_data}>
								<span>Faixa de medição:</span>
								<p>{item.measuring_range}</p>
							</div>
							<div className={styles.result_data}>
								<span>Resolução ideal: </span>
								<p>{item.optimal_resolution}</p>
							</div>
							<div className={styles.result_data}>
								<span>Ident.: </span>
								<p>{item.identifier ? 'Sim' : 'Não'}</p>
							</div>
							<div className={styles.result_data}>
								<span>Cond. Amb.: </span>
								<p>{item.environmental_conditions ? 'Sim' : 'Não'}</p>
							</div>
							<div className={styles.result_data}>
								<span>Maior desvio: </span>
								<p>{item.biggest_deviation}</p>
							</div>
							<div className={styles.result_data}>
								<span>Incerteza da medição: </span>
								<p>{item.measurement_uncertainty}</p>
							</div>
							<div className={styles.result_data}>
								<span>MD+MI: </span>
								<p>{item.biggest_deviation_plus_measurement_uncertainty}</p>
							</div>
							<div className={styles.result_data}>
								<span>Status: </span>
								<p
									className={`${
										item.status_result === 'APROVADO'
											? styles.status_approved
											: styles.status_reproved
									}`}>
									{item.status_result}
								</p>
							</div>
						</div>
					)
				})}
				<Divider className={styles.divider} />
			</div>
		</div>
	)
}
