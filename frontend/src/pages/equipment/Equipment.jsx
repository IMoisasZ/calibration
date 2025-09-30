import React, { useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Select from '../../components/select/Select'
import Button from '../../components/button/Button'
import EquipmentList from './EquipmentList'
import styles from './Equipment.module.css'
import { useFetchData } from '../../hooks/useFetchData.hook'
import { createMessage } from '../../utils/message.utils'
import { getAllEquipmentType } from '../../services/equipment_type.service'
import { getAllOwner } from '../../services/owner.service'
import { getAllUnities } from '../../services/unity.service'
import { getAllCalibrationPeriodicity } from '../../services/calibration_periodicity.service'
import { createUpdateEquipmentValidator } from '../../validator/equipment.validator'
import {
	createEquipment,
	updateEquipment,
} from '../../services/equipment.service'

export default function Equipment() {
	const [id, setId] = useState('')
	const [equipmentType, setEquipmentType] = useState(0)
	const [identifier, setIdentifier] = useState('')
	const [description, setDescription] = useState('')
	const [ownerId, setOwnerId] = useState(0)
	const [division, setDivision] = useState('')
	const [unityId, setUnityId] = useState(0)
	const [minCapacity, setMinCapacity] = useState('')
	const [maxCapacity, setMaxCapacity] = useState('')
	const [acceptanceCriteria, setAcceptanceCriteria] = useState('')
	const [calibrationPeriodicity, setCalibrationPeriodicity] = useState(0)
	const [active, setActive] = useState(true)
	const [showListEquipment, setShowListEquipment] = useState(true)
	const [isLoading, setIsLoading] = useState(false)

	/**@description -> Use hook fetchData */
	const { data: listEquipmentType } = useFetchData(getAllEquipmentType)
	const { data: listOwner } = useFetchData(getAllOwner)
	const { data: listUnity } = useFetchData(getAllUnities)
	const { data: listCalibrationPeriodicity } = useFetchData(
		getAllCalibrationPeriodicity
	)

	async function handleOnSubmit(e) {
		e.preventDefault()
		setIsLoading(true)
		try {
			const dataEquipment = {
				id,
				equipment_type_id: equipmentType,
				identifier,
				description,
				owner_id: ownerId,
				division,
				unity_id: unityId,
				min_capacity: minCapacity,
				max_capacity: maxCapacity,
				calibration_periodicity_id: calibrationPeriodicity,
				active,
			}
			createUpdateEquipmentValidator(dataEquipment)
			if (!id) {
				await createEquipment(dataEquipment)
				createMessage('success', 'Equipamento criado com sucesso!')
			} else {
				await updateEquipment(dataEquipment)
				createMessage('success', 'Equipamento alterado com sucesso!')
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
			handleClear()
			setShowListEquipment(true)
		}
	}

	function handleOnEdit(row) {
		setId(row.id)
		setEquipmentType(row.equipment_type_id)
		setIdentifier(row.identifier)
		setDescription(row.description)
		setOwnerId(row.owner_id)
		setDivision(row.division)
		setUnityId(row.unity_id)
		setMinCapacity(row.min_capacity)
		setMaxCapacity(row.max_capacity)
		setAcceptanceCriteria(row.acceptance_criteria)
		setCalibrationPeriodicity(row.calibration_periodicity_id)
		setActive(row.active)
		setShowListEquipment(false)
	}

	function handleClear() {
		setId('')
		setEquipmentType(0)
		setIdentifier('')
		setDescription('')
		setOwnerId(0)
		setDivision('')
		setUnityId(0)
		setMinCapacity('')
		setMaxCapacity('')
		setAcceptanceCriteria('')
		setCalibrationPeriodicity(0)
		setActive(true)
	}

	if (showListEquipment) {
		return (
			<EquipmentList
				setShowEquipmentList={setShowListEquipment}
				handleOnEdit={handleOnEdit}
			/>
		)
	} else {
		return (
			<Container title='Cadastro de Equipamento'>
				<Form handleSubmit={handleOnSubmit}>
					<div className={styles.container_div}>
						<Select
							defaultName='Selecione o tipo de equipamento'
							className={`${styles.select} ${styles.select_type_equipment}`}
							handleChange={(e) => setEquipmentType(e.currentTarget.value)}
							value={equipmentType}
							options={listEquipmentType}
							labelKey='equipment_type'
							valueKey='id'
						/>
						<Input
							labelName='Identficação'
							classNameContainerInput={`${styles.input} ${styles.input_identifier}`}
							name='identifier'
							type='text'
							value={identifier}
							handleChange={(e) => setIdentifier(e.currentTarget.value)}
						/>
					</div>
					<Input
						labelName='Descrição'
						classNameContainerInput={`${styles.input} ${styles.input_description}`}
						name='description'
						type='text'
						value={description}
						handleChange={(e) => setDescription(e.currentTarget.value)}
					/>
					<div className={styles.container_div}>
						<Select
							defaultName='Selelcione o proprietário'
							className={`${styles.select} ${styles.select_owner}`}
							value={ownerId}
							handleChange={(e) => setOwnerId(e.currentTarget.value)}
							options={listOwner}
							valueKey='id'
							labelKey='ownerLocalization'
						/>
						<Input
							labelName='Divisão'
							classNameContainerInput={`${styles.input} ${styles.input_division}`}
							name='division'
							type='number'
							value={division}
							handleChange={(e) => {
								const rawValue = e.currentTarget.value
								const numericValue = rawValue.replace(',', '.')
								setDivision(numericValue)
							}}
						/>
						<Select
							defaultName='Selecione a unidade de medida'
							className={`${styles.select} ${styles.select_unity}`}
							value={unityId}
							handleChange={(e) => setUnityId(e.currentTarget.value)}
							options={listUnity}
							labelKey='tag'
							valueKey='id'
						/>
					</div>
					<div className={styles.container_div_last}>
						<Input
							labelName='Capacidade minima'
							classNameContainerInput={`${styles.input} ${styles.input_capacity}`}
							name='min_capacity'
							type='number'
							value={minCapacity}
							handleChange={(e) => setMinCapacity(e.currentTarget.value)}
						/>
						<span>
							<strong>Até</strong>
						</span>
						<Input
							labelName='Capacidade máxima'
							classNameContainerInput={`${styles.input} ${styles.input_capacity}`}
							name='max_capacity'
							type='number'
							value={maxCapacity}
							handleChange={(e) => setMaxCapacity(e.currentTarget.value)}
						/>
						<Input
							labelName='Critério de ceitação'
							classNameContainerInput={`${styles.input} ${styles.input_acceptance_criteria}`}
							name='acceptance_criteria'
							type='number'
							value={acceptanceCriteria}
							handleChange={(e) => setAcceptanceCriteria(e.currentTarget.value)}
						/>
						<Select
							defaultName='Selecione a periodicidade de calibração'
							className={`${styles.select} ${styles.select_periodicity}`}
							name='calibration_perodicity'
							value={calibrationPeriodicity}
							handleChange={(e) =>
								setCalibrationPeriodicity(e.currentTarget.value)
							}
							options={listCalibrationPeriodicity}
							labelKey='description'
							valueKey='id'
						/>
						<Input
							labelName='Ativo'
							classNameContainerInput={`${styles.checkbox}`}
							name='active'
							type='checkbox'
							checked={active}
							handleChange={() => setActive(!active)}
						/>
					</div>
					<div className={styles.container_btn}>
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
						/>
						<Button
							nameBtn='Lista de equipamentos'
							handleClick={() => setShowListEquipment(true)}
							title='Clique para ver a lista de equipamentos!'
						/>
					</div>
				</Form>
			</Container>
		)
	}
}
