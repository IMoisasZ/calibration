import React, { useState, useEffect, useCallback } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Table from '../../components/table/Table'
import { createMessage } from '../../utils/message.utils'
import {
	createUnity,
	updateUnity,
	getAllUnities,
	updateUnityStatus,
} from '../../services/unity.service'
import { createUpdateUnityValidator } from '../../validator/unity.validator'
import styles from './Unity.module.css'

export default function Unity() {
	const [id, setId] = useState('')
	const [description, setDescription] = useState('')
	const [tag, setTag] = useState('')
	const [active, setActive] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [status, setStatus] = useState(true)
	const [listUnities, setListUnities] = useState([])

	async function handleOnSubmit(e) {
		e.preventDefault()
		setIsLoading(true)
		try {
			const unity = { id, description, tag, active }
			createUpdateUnityValidator(unity)
			if (!id) {
				await createUnity({ description, tag, active })
				createMessage('success', 'Unidade incluída com sucesso!')
			} else {
				await updateUnity(unity)
				createMessage('success', 'Unidade alterada com sucesso!')
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
			loadUnities(status)
			handleClear()
		}
	}

	const loadUnities = useCallback(async () => {
		try {
			const data = await getAllUnities(status)

			const formatDataUnities = data.map((item) => ({
				...item,
				activeStatus: item.active ? 'Sim' : 'Não',
			}))
			setListUnities(formatDataUnities)
		} catch (error) {
			console.error({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		}
	}, [status, setListUnities])

	useEffect(() => {
		loadUnities()
	}, [loadUnities])

	function handleEdit(row) {
		setId(row.id)
		setDescription(row.description)
		setTag(row.tag)
		setActive(row.active)
	}

	async function disableEnableUnity(row) {
		try {
			await updateUnityStatus(row.id, !row.active)
		} catch (error) {
			console.log({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		} finally {
			loadUnities(status)
		}
	}

	function handleClear() {
		setId('')
		setDescription('')
		setTag('')
		setActive(true)
	}

	const header = [
		{ label: 'Descrição', key: 'description' },
		{ label: 'Tag', key: 'tag' },
		{ label: 'Ativo', key: 'activeStatus' },
		{ label: 'Ações' },
	]

	return (
		<Container title='Unidade de medida'>
			<Form
				handleSubmit={handleOnSubmit}
				classNameForm={styles.form_unities}>
				<Input
					name='description'
					labelName='Unidade'
					type='text'
					value={description}
					handleChange={(e) => setDescription(e.currentTarget.value)}
					classNameContainerInput={styles.input}
				/>
				<Input
					name='tag'
					labelName='Tag'
					type='text'
					value={tag}
					handleChange={(e) => setTag(e.currentTarget.value)}
					classNameContainerInput={styles.input_tag}
				/>
				<Input
					name='active'
					labelName='Ativo'
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
					disabled={isLoading}
					handleClick={handleClear}
				/>
			</Form>
			<Input
				name='status'
				labelName='Mostrar apenas unidades ativas?'
				type='checkbox'
				checked={status}
				handleChange={() => setStatus(!status)}
				classNameContainerInput={styles.checkbox_status}
			/>
			<Table
				headers={header}
				data={listUnities}
				handleEdit={handleEdit}
				toggleStatus={disableEnableUnity}
			/>
		</Container>
	)
}
