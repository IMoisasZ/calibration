import React, { useCallback, useEffect, useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Table from '../../components/table/Table'
import { createMessage } from '../../utils/message.utils'
import {
	createCalibrationPeriodicity,
	updateCalibrationPeriodicity,
	getAllCalibrationPeriodicity,
	updateCalibrationPeriodicityStatus,
} from '../../services/calibration_periodicity.service'
import { createUpdateCalibrationPeriodicityValidator } from '../../validator/calibration_periodicity.validator'
import styles from './CalibrationPeriodicity.module.css'

export default function CalibrationPeriodicity() {
	const [id, setId] = useState('')
	const [description, setDescription] = useState('')
	const [calibrationDays, setCalibrationDays] = useState('')
	const [active, setActive] = useState(true)
	const [status, setStatus] = useState(true)
	const [listCalibrationPeriodicity, setListCalibrationPeriodicity] = useState(
		[]
	)
	const [isLoading, setIsLoading] = useState(false)

	async function handleOnSubmit(e) {
		e.preventDefault()
		setIsLoading(true)
		try {
			const calibration_periodicity = {
				id,
				description,
				calibration_days: calibrationDays,
				active,
			}
			createUpdateCalibrationPeriodicityValidator(calibration_periodicity)
			if (!id) {
				await createCalibrationPeriodicity(calibration_periodicity)
				createMessage(
					'success',
					'Periodicidade de calibração cadastrada com sucesso!'
				)
			} else {
				await updateCalibrationPeriodicity(calibration_periodicity)
				createMessage(
					'success',
					'Periodicidade de calibração alterada com sucesso!'
				)
			}
		} catch (error) {
			console.error({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		} finally {
			setIsLoading(false)
			loadCalibrationPeriodicity()
		}
	}

	const loadCalibrationPeriodicity = useCallback(async () => {
		try {
			const data = await getAllCalibrationPeriodicity(status)

			const formatDataCalibrationPeriodicity = data.map((item) => ({
				...item,
				activeStatus: item.active ? 'Sim' : 'Não',
			}))
			setListCalibrationPeriodicity(formatDataCalibrationPeriodicity)
			handleClear()
		} catch (error) {
			console.error({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		}
	}, [status, setListCalibrationPeriodicity])

	useEffect(() => {
		loadCalibrationPeriodicity()
	}, [loadCalibrationPeriodicity])

	function handleEdit(row) {
		setId(row.id)
		setDescription(row.description)
		setCalibrationDays(row.calibration_days)
		setActive(row.active)
	}

	async function disableEnableCalibrationPeriodicity(row) {
		try {
			await updateCalibrationPeriodicityStatus(row.id, !row.active)
		} catch (error) {
			console.error({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		} finally {
			loadCalibrationPeriodicity()
		}
	}

	function handleClear() {
		setId('')
		setDescription('')
		setCalibrationDays('')
		setActive(true)
	}

	const header = [
		{ label: 'Descrição', key: 'description' },
		{ label: 'Qtde dias', key: 'calibration_days' },
		{ label: 'Ativo', key: 'activeStatus' },
		{ label: 'Ações' },
	]

	return (
		<Container title='Cadastro de periodicidade de calibração'>
			<Form
				handleSubmit={handleOnSubmit}
				classNameForm={styles.calibration_periodicity_form}>
				<Input
					labelName='Descrição'
					name='description'
					type='text'
					value={description}
					handleChange={(e) => setDescription(e.currentTarget.value)}
					classNameContainerInput={styles.input}
				/>
				<Input
					labelName='Periodicidade em dias'
					name='calibration_days'
					type='number'
					value={calibrationDays}
					handleChange={(e) =>
						setCalibrationDays(Number(e.currentTarget.value))
					}
					classNameContainerInput={styles.input}
				/>
				<Input
					labelName='Ativo'
					name='active'
					type='checkbox'
					checked={active}
					handleChange={() => setActive(!active)}
					classNameContainerInput={styles.checkbox}
				/>
				<Button
					nameBtn={!id ? 'Incluir' : 'Editar'}
					title={!id ? 'Clique para incluir!' : 'Clique para editar!'}
					type='submit'
					disabled={isLoading}
				/>
				<Button
					nameBtn='Limpar'
					title='Clique para limpar os campos!'
					type='button'
					handleClick={handleClear}
					disabled={isLoading}
				/>
			</Form>
			<Input
				labelName='Mostrar apenas as periodicidades de calibração ativas?'
				name='status'
				type='checkbox'
				checked={status}
				handleChange={() => setStatus(!status)}
				classNameContainerInput={styles.checkbox_status}
			/>
			<Table
				data={listCalibrationPeriodicity}
				headers={header}
				handleEdit={handleEdit}
				toggleStatus={disableEnableCalibrationPeriodicity}
			/>
		</Container>
	)
}
