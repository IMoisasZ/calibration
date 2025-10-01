import React, { useState, useEffect, useCallback } from 'react'
import Container from '../../../components/container/Container'
import Form from '../../../components/form/Form'
import Input from '../../../components/input/Input'
import Button from '../../../components/button/Button'
import Table from '../../../components/table/Table'
import { createUpdateEquipmentTypeValidator } from '../../../validator/equipment_type.validator'
import {
	createEquipmentType,
	updateEquipmentType,
	getAllEquipmentType,
	updateEquipmentTypeStatus,
} from '../../../services/equipment_type.service'
import { createMessage } from '../../../utils/message.utils'
import styles from './EquipmentType.module.css'

export default function EquipmentType() {
	const [id, setId] = useState('')
	const [equipmentType, setEquipmentType] = useState('')
	const [active, setActive] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [listEquipmentType, setListEquipmentType] = useState([])
	const [status, setStatus] = useState(true)

	const loadEquipmentType = useCallback(async () => {
		try {
			const data = await getAllEquipmentType(status)

			const formatDataEquipmentType = data.map((item) => ({
				...item,
				activeStatus: item.active ? 'Sim' : 'Não',
			}))
			setListEquipmentType(formatDataEquipmentType)
		} catch (error) {
			console.error({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		}
	}, [status, setListEquipmentType])

	useEffect(() => {
		loadEquipmentType()
	}, [loadEquipmentType])

	async function handleOnSubmit(e) {
		e.preventDefault()
		setIsLoading(true)
		try {
			const dataEquipmentType = {
				id,
				equipment_type: equipmentType,
				active,
			}
			createUpdateEquipmentTypeValidator(dataEquipmentType)
			if (!id) {
				const { id, ...data } = dataEquipmentType
				await createEquipmentType(data)
				createMessage('success', 'Tipo de equipamento criado com sucesso!')
				handleClear()
			} else {
				await updateEquipmentType(dataEquipmentType)
				createMessage('success', 'Tipo de equipamento alterado com sucesso!')
				handleClear()
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
			loadEquipmentType()
		}
	}

	function handleClear() {
		setId('')
		setEquipmentType('')
		setActive(true)
		setStatus(true)
	}

	function handleEdit(row) {
		setId(row.id)
		setEquipmentType(row.equipment_type)
		setActive(row.active)
	}

	async function disableEnableEquipmentType(row) {
		try {
			await updateEquipmentTypeStatus(row.id, !row.active)
		} catch (error) {
			console.log({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		} finally {
			loadEquipmentType()
		}
	}

	const header = [
		{ label: 'Tipo de equipamento', key: 'equipment_type' },
		{ label: 'Ativo', key: 'activeStatus' },
		{ label: 'Ações' },
	]

	return (
		<Container title='Tipo de equipamento'>
			<Form handleSubmit={handleOnSubmit}>
				<div className={styles.container_input}>
					<Input
						labelName='Tipo de equipamento'
						type='text'
						name='equipment_type'
						value={equipmentType?.toUpperCase()}
						handleChange={(e) => setEquipmentType(e.currentTarget.value)}
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
						type='submit'
						title={!id ? 'Clique para incluir!' : 'Clique para editar!'}
						disabled={isLoading}
					/>
					<Button
						nameBtn='Limpar'
						type='button'
						title='Clique para limpar!'
						handleClick={handleClear}
						disabled={isLoading}
					/>
				</div>
			</Form>
			<div>
				<Input
					type='checkbox'
					name='status'
					checked={status}
					handleChange={() => setStatus(!status)}
					labelName='Mostrar apenas tipo de equipamentos ativos?'
					classNameContainerInput={styles.checkbox_status}
				/>
			</div>
			<Table
				data={listEquipmentType}
				headers={header}
				handleEdit={handleEdit}
				toggleStatus={disableEnableEquipmentType}
			/>
		</Container>
	)
}
