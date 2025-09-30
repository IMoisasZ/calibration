import React, { useEffect, useState } from 'react'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import styles from './Calibration.module.css'

export default function CalibrationResult({
	calibrationOthers,
	currentResult,
	handleChange,
	handleAddCalibrationResult,
	handleClearCalibrationResult = null,
	handleDeleteResult = null,
}) {
	const [optimalResolution, setOptimalResolution] = useState('')

	useEffect(() => {
		if (!calibrationOthers) {
			return
		}
		if (
			!calibrationOthers.acceptanceCriteriaValue ||
			!calibrationOthers.factor
		) {
			return
		}
		const acceptance_criteria = calibrationOthers.acceptanceCriteriaValue
		const factor = calibrationOthers.factor
		const optimal_resolution = (acceptance_criteria / factor).toFixed(4)
		const unity = calibrationOthers.equipment.unity.tag.toLowerCase()
		const title = `A resolução ideal é calculada apatir do critério de aceitação dividio pelo fator. Sendo assim temos: Critério de aceitação: ${acceptance_criteria} / Fator: ${factor} = Resolução ideal: ${optimal_resolution}${unity}`
		setOptimalResolution(title)
	}, [calibrationOthers])

	return (
		<>
			<h3>Resultados da calibração</h3>
			<section className={styles.calibration_result}>
				<div className={styles.calibration_result_main}>
					<div className={styles.calibration_result_first}>
						<Input
							name='measuring_range'
							labelName='Faixa de medição'
							type='text'
							classNameContainerInput={styles.input}
							value={currentResult.measuring_range}
							handleChange={handleChange}
						/>
						<Input
							name='optimal_resolution'
							labelName='Resolução ideal'
							type='number'
							classNameContainerInput={styles.input}
							value={currentResult.optimal_resolution}
							handleChange={handleChange}
							disabled={true}
							title={optimalResolution}
						/>
						<span className={styles.unity_calibration_result}>
							{calibrationOthers?.equipment?.unity?.tag.toLowerCase()}
						</span>
					</div>
					<div className={styles.div_checkboxes}>
						<Input
							name='identifier'
							labelName='Ident.'
							type='checkbox'
							checked={currentResult.identifier}
							classNameContainerInput={styles.checkbox}
							title='Identificação do equipamento ok?'
							handleChange={handleChange}
						/>
						<Input
							name='environmental_conditions'
							labelName='C. Amb'
							type='checkbox'
							checked={currentResult.environmental_conditions}
							classNameContainerInput={styles.checkbox}
							title='As condições ambientais estão corretas?'
							handleChange={handleChange}
						/>
					</div>
					<section className={styles.calibration_result_second}>
						<Input
							name='biggest_deviation'
							labelName='Maior desvio'
							type='number'
							classNameContainerInput={styles.input}
							value={currentResult.biggest_deviation}
							handleChange={handleChange}
						/>
						<Input
							name='measurement_uncertainty'
							labelName='Incerteza da medição'
							type='Number'
							classNameContainerInput={`${styles.input} ${styles.input_measurement_uncertainty}`}
							value={currentResult.measurement_uncertainty}
							handleChange={handleChange}
						/>
						<Input
							name='biggest_deviation_plus_measurement_uncertainty'
							labelName='MD+IM'
							type='number'
							readOnly={true}
							classNameContainerInput={styles.input}
							value={
								currentResult.biggest_deviation_plus_measurement_uncertainty
							}
							handleChange={handleChange}
							disabled={true}
						/>
						<Input
							name='status_result'
							labelName='Status'
							type='text'
							readOnly={true}
							value={currentResult.status_result}
							handleChange={handleChange}
							disabled={true}
							classNameContainerInput={`${
								currentResult?.status_result === 'APROVADO'
									? styles.approved
									: currentResult?.status_result === 'REPROVADO'
									? styles.reproved
									: ''
							}`}
						/>
					</section>
				</div>
				<Input
					name='comment'
					labelName='Observação'
					type='text'
					classNameContainerInput={styles.input_comment}
					value={currentResult.comment?.toUpperCase()}
					handleChange={handleChange}
				/>
				<div className={styles.calibration_result_btn}>
					<Button
						nameBtn={currentResult.id_result ? 'Editar' : 'Incluir'}
						type='button'
						title='Clique para incluir o resultado!'
						// AQUI: Chama a prop 'handleAddCalibrationResult'
						handleClick={handleAddCalibrationResult}
					/>
					<Button
						nameBtn='Limpar'
						type='button'
						title='Clique para limpar os campos!'
						handleClick={handleClearCalibrationResult}
					/>
					{currentResult.id_result && (
						<Button
							nameBtn='Delete'
							type='button'
							title='Clique para remover o resultado!'
							handleClick={handleDeleteResult}
							classNameButton={styles.btn_remove}
						/>
					)}
				</div>
			</section>
		</>
	)
}
