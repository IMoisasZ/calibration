import React from 'react'
import { replaceDotBySemiColumn } from '../../utils/replace.utils'
import styles from './Calibration.module.css'

export default function CalibrationInfoItems({ equipment }) {
	return (
		<div className={styles.div_data_equipment}>
			<span>
				<strong>Proprietário:</strong>{' '}
				{`${equipment.owner.owner}-${equipment.owner.localization.description}`}
			</span>
			<span>
				<strong>Divisão:</strong>{' '}
				{`${replaceDotBySemiColumn(
					equipment.division
				)} ${equipment.unity.tag.toLowerCase()}`}
			</span>
			<span>
				<strong>Capacidade:</strong>{' '}
				{`${replaceDotBySemiColumn(
					equipment.min_capacity
				)} até ${replaceDotBySemiColumn(equipment.max_capacity)}
							${equipment.unity.tag.toLowerCase()}`}
			</span>
			<span>
				<strong>Critério de aceitação:</strong>{' '}
				{`${replaceDotBySemiColumn(
					equipment.acceptance_criteria
				)} ${equipment.unity.tag.toLowerCase()}`}
			</span>
			<span>
				<strong>Periodicidade de calibração:</strong>{' '}
				{replaceDotBySemiColumn(equipment.calibration_periodicity.description)}
			</span>
		</div>
	)
}
