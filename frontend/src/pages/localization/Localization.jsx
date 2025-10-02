import React, { useCallback, useEffect, useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Table from '../../components/table/Table'
import style from './Localization.module.css'
import { createUpdateLocalizationValidator } from '../../validator/localizationValidator'
import {
	createLocalization,
	updateLocalization,
	getAllLocalization,
	updateLocalizationStatus,
} from '../../services/localization.service'
import { createMessage, defaultErrorMessage } from '../../utils/message.utils'

export default function Localization() {
	/**@description -> useStates of page */
	const [id, setId] = useState('')
	const [description, setDescription] = useState('')
	const [active, setActive] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [listLocalization, setListLocalization] = useState([])
	const [status, setStatus] = useState(true)

	/**@param {e} e -> Event to use the onSubmit  */
	/**@description -> Function to create or update the localization */
	async function handleOnSubmit(e) {
		e.preventDefault()
		setIsLoading(true)

		try {
			createUpdateLocalizationValidator({ description, active })
			if (!id) {
				await createLocalization({ description, active })
				createMessage('success', 'Localização criada com sucesso!')
				handleClear()
			} else {
				const localization = { id, description, active }
				await updateLocalization(localization)
				createMessage('success', 'Localização alterada com sucesso!')
				handleClear()
			}
		} catch (error) {
			// console.error({ error })
			// const errorMessage =
			// 	error.response?.data?.errors ||
			// 	error.message ||
			// 	'Ocorreu um erro desconhecido!'
			// createMessage('error', errorMessage)
			defaultErrorMessage(error)
		} finally {
			setIsLoading(false)
			loadLocalization()
			handleClear()
		}
	}

	const loadLocalization = useCallback(async () => {
		try {
			const data = await getAllLocalization(status)

			const formatDataLocalization = data.map((item) => ({
				...item,
				activeStatus: item.active ? 'Sim' : 'Não',
			}))
			setListLocalization(formatDataLocalization)
		} catch (error) {
			console.error({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		}
	}, [status])

	useEffect(() => {
		loadLocalization()
	}, [loadLocalization])

	/**@description -> Function to clear all fields of the form */
	function handleClear() {
		setId('')
		setDescription('')
		setActive(true)
	}

	function handleEdit(row) {
		setId(row.id)
		setDescription(row.description)
		setActive(row.active)
		setStatus(true)
	}

	async function disableEnableLocalization(row) {
		try {
			await updateLocalizationStatus(row.id, !row.active)
		} catch (error) {
			console.log({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		} finally {
			handleClear()
			loadLocalization()
		}
	}

	const header = [
		{ label: 'Descrição', key: 'description' },
		{ label: 'Ativo', key: 'activeStatus' },
		{ label: 'Ações' },
	]

	return (
		<Container title='Localização do instrumento'>
			<Form
				classNameForm={style.form}
				handleSubmit={handleOnSubmit}>
				<Input
					classNameContainerInput={style.input}
					labelName='Localização'
					value={description?.toUpperCase()}
					handleChange={(e) => setDescription(e.currentTarget.value)}
				/>
				<Input
					classNameContainerInput={style.checkbox}
					type='checkbox'
					labelName='Ativo'
					checked={active}
					handleChange={() => setActive(!active)}
				/>
				<Button
					nameBtn={id ? 'Editar' : 'Incluir'}
					type='submit'
					disabled={isLoading}
				/>
				<Button
					nameBtn='Limpar'
					type='button'
					handleClick={handleClear}
					disabled={isLoading}
				/>
			</Form>
			<Input
				classNameContainerInput={style.checkbox_status}
				labelName='Mostrar apenas localizações ativas?'
				name='status'
				type='checkbox'
				handleChange={() => setStatus(!status)}
				checked={status}
			/>
			<Table
				headers={header}
				data={listLocalization}
				handleEdit={handleEdit}
				toggleStatus={disableEnableLocalization}
			/>
		</Container>
	)
}
