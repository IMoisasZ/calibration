import React, { useCallback, useEffect, useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Select from '../../components/select/Select'
import Button from '../../components/button/Button'
import Table from '../../components/table/Table'
import styles from './Owner.module.css'
import { useFetchData } from '../../hooks/useFetchData.hook'
import {
	createOwner,
	updateOwner,
	getAllOwner,
	updateOwnerStatus,
} from '../../services/owner.service'
import { getAllLocalization } from '../../services/localization.service'
import { createMessage } from '../../utils/message.utils'
import { createUpdateOwnerValidator } from '../../validator/owner.validator'

export default function Owner() {
	const [id, setId] = useState('')
	const [owner, setOwner] = useState('')
	const [localization, setLocalization] = useState(0)
	const [active, setActive] = useState(true)
	const [status, setStatus] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [listOwners, setListOwners] = useState([])

	/**@description -> Use hook fetchData */
	const { data: listLocalization } = useFetchData(getAllLocalization)

	const loadOwners = useCallback(async () => {
		try {
			const data = await getAllOwner(status)

			const formatDataOwners = data.map((item) => ({
				...item,
				localization: item.localization.description,
				activeStatus: item.active ? 'Sim' : 'Não',
			}))
			setListOwners(formatDataOwners)
		} catch (error) {
			console.error({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		}
	}, [status, setListOwners])

	useEffect(() => {
		loadOwners()
	}, [loadOwners])

	async function handleOnSubmit(e) {
		e.preventDefault()
		setIsLoading(true)
		try {
			const ownerData = { id, owner, localization_id: localization, active }
			createUpdateOwnerValidator(ownerData)
			if (!id) {
				delete ownerData.id
				await createOwner(ownerData)
				createMessage('success', 'Proprietário incluído com sucesso!')
			} else {
				await updateOwner(ownerData)
				createMessage('success', 'Proprietário alterado com sucesso!')
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
			loadOwners()
			handleClear()
		}
	}

	function handleEdit(row) {
		setId(row.id)
		setOwner(row.owner)
		setLocalization(row.localization_id)
		setActive(row.active)
	}

	function handleClear() {
		setId('')
		setOwner('')
		setLocalization(0)
		setActive(true)
	}

	async function disableEnableOwner(row) {
		try {
			await updateOwnerStatus(row.id, !row.active)
		} catch (error) {
			console.error({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		} finally {
			loadOwners()
		}
	}

	const header = [
		{ label: 'Proprietário', key: 'owner' },
		{ label: 'Localização', key: 'localization' },
		{ label: 'Ativo', key: 'activeStatus' },
		{ label: 'Ações' },
	]

	return (
		<Container title='Proprietários'>
			<Form
				handleSubmit={handleOnSubmit}
				classNameForm={styles.form_owner}>
				<Input
					classNameContainerInput={styles.input}
					type='text'
					name='owner'
					handleChange={(e) => setOwner(e.currentTarget.value)}
					value={owner}
					labelName='Proprietário'
				/>
				<Select
					className={styles.select}
					defaultName='Selecione uma localização'
					value={localization}
					handleChange={(e) => setLocalization(e.currentTarget.value)}
					valueKey='id'
					labelKey='description'
					options={listLocalization}
				/>
				<Input
					classNameContainerInput={styles.checkbox}
					type='checkbox'
					name='active'
					labelName='Ativo'
					handleChange={() => setActive(!active)}
					checked={active}
				/>
				<Button
					nameBtn={!id ? 'Incluir' : 'Editar'}
					title={!id ? 'Clique para incluir!' : 'Clique para editar!'}
					type='submit'
					disabled={isLoading}
				/>
				<Button
					nameBtn='Limpar'
					title='Clique para limpar os campos'
					type='button'
					handleClick={handleClear}
					disabled={isLoading}
				/>
			</Form>
			<Input
				classNameContainerInput={styles.checkbox_status}
				labelName='Mostrar apenas proprietários ativos?'
				name='status'
				type='checkbox'
				handleChange={() => setStatus(!status)}
				checked={status}
			/>
			<Table
				data={listOwners}
				headers={header}
				handleEdit={handleEdit}
				toggleStatus={disableEnableOwner}
			/>
		</Container>
	)
}
