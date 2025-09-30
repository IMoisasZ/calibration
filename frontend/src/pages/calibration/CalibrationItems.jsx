import React from 'react'
import Container from '../../components/container/Container'
import { getAllEquipment } from '../../services/equipment.service'
import { useFetchData } from '../../hooks/useFetchData.hook'
import { replaceDotBySemiColumn } from '../../utils/replace.utils'
import styles from './Calibration.module.css'
import Button from '../../components/button/Button'

export default function CalibrationItems({
	setFormData,
	handleSelectEquipment,
}) {
	/**@description -> use dataFetch hook */
	const { data: listEquipment } = useFetchData(getAllEquipment)

	function handleItemClick(item) {
		// CORRIGIDO: Chama a função do pai, passando o OBJETO ITEM COMPLETO
		handleSelectEquipment(item)
	}
	return (
		<Container
			title='Lista de instrumentos'
			classNameContainer={styles.container}>
			<div className={styles.div_items}>
				<div>
					<Button
						nameBtn='Calibração'
						title='Clique para ir para calibração!'
						handleClick={() =>
							setFormData((prev) => ({
								...prev,
								calibrationOthers: {
									...prev.calibrationOthers,
									showListEquipment: false,
								},
							}))
						}
						classNameButton={styles.btn_calibration}
					/>
				</div>
				{listEquipment.map((item) => {
					return (
						<div
							key={item.id}
							className={`${styles.div_data_equipment} ${styles.div_data_equipment_list}`}
							onClick={() => handleItemClick(item)}
							title='Clique para escolher o item!'>
							<div className={styles.div_info_items}>
								<span>Identificação: </span>
								<p>{item.identifier}</p>
							</div>
							<div className={styles.div_info_items}>
								<span>Tipo equipaento: </span>
								<p>{item.equipment_type.equipment_type}</p>
							</div>
							<div className={styles.div_info_items}>
								<span>Descrição: </span>
								<p>{item.description}</p>
							</div>
							<div className={styles.div_info_items}>
								<span>Proprietario: </span>
								<p>{`${item.owner.owner}-${item.owner.localization.description}`}</p>
							</div>
							<div className={styles.div_info_items}>
								<span>Divisão: </span>
								<p>{`${replaceDotBySemiColumn(
									item.division
								)} ${item.unity.tag.toLowerCase()}`}</p>
							</div>
							<div className={styles.div_info_items}>
								<span>Capacidde: </span>
								<p>{`${replaceDotBySemiColumn(
									item.min_capacity
								)} até ${replaceDotBySemiColumn(
									item.max_capacity
								)} ${item.unity.tag.toLowerCase()}`}</p>
							</div>
						</div>
					)
				})}
			</div>
		</Container>
	)
}
