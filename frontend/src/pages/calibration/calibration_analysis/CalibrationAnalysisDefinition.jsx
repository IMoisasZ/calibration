import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Container from '../../../components/container/Container'
import Form from '../../../components/form/Form'
import Select from '../../../components/select/Select'
import TextArea from '../../../components/text_area/TextArea'
import Button from '../../../components/button/Button'
import CalibrationAnalysisDataCalibration from './CalibrationAnalysisDataCalibration'
import styles from './CalibrationAnalysis.module.css'
import Divider from '../../../components/divider/Divider'
import { createCalibrationAnalysisDefinitionValidator } from '../../../validator/calibration_analysis_definition.validator'
import { createCalibrationAnalysis } from '../../../services/calibration_analysis_definition.service'
import { createMessage } from '../../../utils/message.utils'

export default function CalibrationAnalysisDefinition() {
	const [statusDefinition, setStatusDefinition] = useState('')
	const [notes, setNotes] = useState('')
	const [calibration, setCalibration] = useState([])

	const navigate = useNavigate()

	async function handleOnSubmit(e) {
		e.preventDefault()
		const CalibrationAnalysis = {
			calibration_id: calibration.id,
			original_status: calibration.calibration_status,
			decision_status: statusDefinition,
			user_id: 1,
			notes: notes,
		}
		try {
			createCalibrationAnalysisDefinitionValidator(CalibrationAnalysis)

			await createCalibrationAnalysis(CalibrationAnalysis)
			createMessage('success', 'Analise da calibração realizada com sucesso!')
			setTimeout(() => {
				navigate('/calibration_analysis_list')
			}, 2000)
		} catch (error) {
			console.error({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		}
	}

	const location = useLocation()
	useEffect(() => {
		const stateData = location?.state
		setCalibration(stateData)
	}, [location.state])

	const optionStatusDefinition = [
		{ label: 'APROVADO CONDICIONAL' },
		{ label: 'REPROVADO' },
	]

	function createNotes(selectedStatus) {
		if (selectedStatus === 'REPROVADO') {
			setNotes('CALIBRAÇÃO REPROVADA!')
			return
		}

		if (selectedStatus === 'APROVADO CONDICIONAL') {
			const notesByCalibrationResult = calibration.calibration_results.filter(
				(item) => item.status_result === 'APROVADO'
			)
			setNotes(
				`APROVADO A(S) FAIXA(S) DE MEDIÇÃO(ÕES) DE ${notesByCalibrationResult.map(
					(item) => item.measuring_range
				)}`
			)
			return
		}
	}

	function handleDecisionStatus(e) {
		setNotes('')
		const selectedStatus = e.currentTarget.value
		setStatusDefinition(selectedStatus)
		createNotes(selectedStatus)
	}

	return (
		<Container title='Analise da calibração'>
			<Form handleSubmit={handleOnSubmit}>
				<CalibrationAnalysisDataCalibration calibration={calibration} />
				<div className={styles.container_analysis_calibration}>
					<Select
						name='status_definition'
						defaultName='Selecione um status...'
						value={statusDefinition}
						handleChange={handleDecisionStatus}
						options={optionStatusDefinition}
						labelKey='label'
						valueKey='label'
						className={styles.select}
					/>
					<TextArea
						labelName='Nota'
						name='notes'
						value={notes}
						handleChange={(e) => setNotes(e.currentTarget.value)}
						classNameTextArea={styles.textArea}
						classNameContainerTextArea={`${styles.container_textArea} ${
							notes.length < 15 ? styles.count_nok : styles.count_ok
						}`}
						quantityUsed={notes.trim().length}
					/>
				</div>
				<Divider className={styles.divider} />
				<div className={styles.container_btns_calibration_analysis_definition}>
					<Button
						nameBtn='Realizar analise'
						type='submit'
						title='Clique para definir a analise da calibração!'
					/>
					<Button
						nameBtn='Cancelar'
						type='button'
						title='Clique para definir a analise da calibração!'
						handleClick={() => navigate(`/calibration_analysis_list`)}
					/>
				</div>
			</Form>
		</Container>
	)
}
