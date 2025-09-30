import React, { useCallback, useEffect, useState } from 'react'
import Table from '../../components/table/Table'
import Button from '../../components/button/Button'
import Input from '../../components/input/Input'
import styles from './Equipment.module.css'
import { useFetchData } from '../../hooks/useFetchData.hook'
import {
	getAllEquipment,
	updateEquipmentStatus,
} from '../../services/equipment.service'
import { getAllLocalization } from '../../services/localization.service'
import { getAllEquipmentType } from '../../services/equipment_type.service'
import { createMessage } from '../../utils/message.utils'
import Container from '../../components/container/Container'
import Select from '../../components/select/Select'

export default function EquipmentList({ setShowEquipmentList, handleOnEdit }) {
	const [status, setStatus] = useState(true)
	const [localization, setLocalization] = useState(0)
	const [equipmentType, setEquipmentType] = useState(0)
	const [listEquipment, setListEquipment] = useState([])

	/**@description-> Use hook fetchData */
	const { data: listLocalization } = useFetchData(getAllLocalization)
	const { data: listEquipmentType } = useFetchData(getAllEquipmentType)

	const loadEquipments = useCallback(async () => {
		const data = await getAllEquipment(status)

		const dataFormatEquipment = data.map((item) => ({
			...item,
			equipmentType: item.equipment_type.equipment_type,
			equipmentTypeFilter: item.equipment_type,
			owner: `${item.owner.owner}-${item.owner.localization.description}`,
			ownerFilter: item.owner,
			divisionTable: `${item.division} ${item.unity.tag.toLowerCase()}`,
			capacity: `${item.min_capacity} - ${
				item.max_capacity
			} ${item.unity.tag.toLowerCase()}`,
			acceptance_criteria: item.acceptance_criteria,
			periodicity: item.calibration_periodicity.description,
			activeStatus: item.active ? 'Sim' : 'Não',
		}))
		const filteredData = dataFormatEquipment.filter((item) => {
			const isLocalizationMatch =
				Number(localization) === 0 ||
				Number(item.ownerFilter.localization_id) === Number(localization)
			const isEquipmentTypeMatch =
				Number(equipmentType) === 0 ||
				Number(item.equipmentTypeFilter.id) === Number(equipmentType)

			return isLocalizationMatch && isEquipmentTypeMatch
		})

		setListEquipment(filteredData)
	}, [status, localization, equipmentType])
	useEffect(() => {
		loadEquipments()
	}, [loadEquipments])

	function handleEdit(row) {
		handleOnEdit(row)
	}

	async function disableEnableEquipment(row) {
		try {
			await updateEquipmentStatus(row.id, !row.active)
		} catch (error) {
			console.error({ error })
			const errorMessage =
				error.response?.data?.errors ||
				error.message ||
				'Ocorreu um erro desconhecido!'
			createMessage('error', errorMessage)
		} finally {
			loadEquipments()
		}
	}

	const header = [
		{ label: 'Tp. equip.', key: 'equipmentType' },
		{ label: 'Identificação', key: 'identifier' },
		{ label: 'Descrição', key: 'description' },
		{ label: 'Proprietário', key: 'owner' },
		{ label: 'Divisão', key: 'divisionTable' },
		{ label: 'Capacidade', key: 'capacity' },
		{ label: 'C. aceitação', key: 'acceptance_criteria' },
		{ label: 'P. calibração', key: 'periodicity' },
		{ label: 'Ativo', key: 'activeStatus' },
		{ label: 'Ações' },
	]
	return (
		<Container
			classNameContainer={styles.container}
			title='Lista de equipamentos'>
			<section className={styles.equipment_list}>
				<header className={styles.equipmentList_header}>
					<Button
						nameBtn='Novo equipamento'
						handleClick={() => setShowEquipmentList(false)}
					/>
				</header>

				<div className={styles.div_filter}>
					<Input
						type='checkbox'
						labelName='Mostrar apenas equipamentos ativos?'
						classNameContainerInput={styles.equipment_list_checkbox}
						name='status'
						checked={status}
						handleChange={() => setStatus(!status)}
					/>
					<Select
						name='localization'
						defaultName='Selecione uma localização...'
						value={localization}
						handleChange={(e) => setLocalization(e.currentTarget.value)}
						options={listLocalization}
						labelKey='description'
						valueKey='id'
						className={styles.select}
					/>
					<Select
						name='equipment_type'
						defaultName='Selecione um tipo de equipamento...'
						value={equipmentType}
						handleChange={(e) => setEquipmentType(e.currentTarget.value)}
						options={listEquipmentType}
						labelKey='equipment_type'
						valueKey='id'
						className={styles.select}
					/>
				</div>

				<Table
					data={listEquipment}
					headers={header}
					handleEdit={handleEdit}
					toggleStatus={disableEnableEquipment}
					className={styles.table}
				/>
				<span>
					<strong>
						Legenda: Tp. equip = Tipo de equipamento | C. aceitação = Critério
						de aceitação | P. calibração = Periodicidade de calibração
					</strong>
				</span>
			</section>
		</Container>
	)
}
