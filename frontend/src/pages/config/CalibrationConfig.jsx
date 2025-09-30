import React, { useCallback, useEffect, useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Table from '../../components/table/Table'
import {
	updateCalibrationConfigNotActualAndCreate,
	getAllCalibrationConfig,
} from '../../services/calibration_config.service'
import { createCalibrationConfigFactor } from '../../validator/calibration_config.validator'
import { createMessage } from '../../utils/message.utils'
import styles from './CalibrationConfig.module.css'

export default function CalibrationConfig() {
	const [factor, setFactor] = useState(1)
	const [actual, setActual] = useState(true)
	const [listFactor, setListFactor] = useState([])

	const loadCalibrationConfig = useCallback(async () => {
		const actualString = actual ? 'true' : 'false'
		const data = await getAllCalibrationConfig(actualString)

		const dataFormat = data.map((item) => ({
			...item,
			actualStatus: item.actual ? 'Sim' : 'Não',
			data: new Date(item.createdAt).toLocaleDateString(),
		}))

		setListFactor(dataFormat)
	}, [actual])

	useEffect(() => {
		loadCalibrationConfig()
	}, [loadCalibrationConfig])

	async function handleSubmit(e) {
		e.preventDefault()
		try {
			const calibrationConfig = { factor: Number(factor) }
			createCalibrationConfigFactor(calibrationConfig)
			await updateCalibrationConfigNotActualAndCreate(calibrationConfig)
			createMessage('success', 'Fator incluido com sucesso!')
		} catch (error) {
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		} finally {
			loadCalibrationConfig()
			handleClear()
		}
	}

	function handleClear() {
		setFactor(1)
	}

	const header = [
		{ label: 'Data', key: 'data' },
		{ label: 'Fator', key: 'factor' },
		{ label: 'Atual', key: 'actualStatus' },
	]

	return (
		<Container title='Configurações'>
			<Form
				handleSubmit={handleSubmit}
				classNameForm={styles.form}>
				<Input
					name='factor'
					type='number'
					labelName='Fator'
					value={factor}
					handleChange={(e) => setFactor(e.currentTarget.value)}
					classNameContainerInput={styles.input}
					min={1}
				/>
				<Button
					nameBtn='Incluir'
					title='Clique para salvar o novo fator!'
					type='submit'
					classNameButton={styles.btn}
				/>
			</Form>
			<Input
				type='checkbox'
				labelName='Mostrar apenas o fator atual?'
				checked={actual}
				handleChange={() => setActual(!actual)}
				classNameContainerInput={styles.checkbox}
			/>
			<Table
				data={listFactor}
				headers={header}
			/>
		</Container>
	)
}
