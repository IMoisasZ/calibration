/** @format */

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../../../components/container/Container'
import Table from '../../../components/table/Table'
import { getAllCalibrationIsAnalysis } from '../../../services/calibration.service'
import { FaTriangleExclamation, FaCircle } from 'react-icons/fa6'
import styles from './CalibrationFinal.module.css'
import { verifyNextCalibration } from '../../../utils/calibration.utils'

export default function CalibrationFinalData() {
	const [listCalibration, setListCalibration] = useState([])
	const [status, setStatus] = useState(null)
	const [localization, setLocalization] = useState('')

	const navigate = useNavigate()

	useEffect(() => {
		async function loadCalibration() {
			const data = await getAllCalibrationIsAnalysis()
			const formatData = data.map((item) => ({
				...item,
				analysis: item.is_analysis ? <FaTriangleExclamation /> : null,
				identifier: item.equipment.identifier,
				owner: item.equipment.owner.owner,
				description: item.equipment.description,
				division: `${
					item.equipment.division
				}${item.equipment.unity.tag.toLowerCase()}`,
				capacity: `${item.equipment.min_capacity} até ${
					item.equipment.max_capacity
				}${item.equipment.unity.tag.toLowerCase()}`,
				certificate: item.certificate_number,
				localization: item.equipment.owner.localization.description,
				periodicity_calibration:
					item.equipment.calibration_periodicity.description,
				calibration_date: new Date(item.calibration_date).toLocaleDateString(),
				next_calibration: new Date(item.next_calibration).toLocaleDateString(),
				status_data_calibration:
					verifyNextCalibration(item.next_calibration).status === 'NO PRAZO' ? (
						<FaCircle color='green' />
					) : verifyNextCalibration(item.next_calibration).status ===
					  'proximo a vencer' ? (
						<FaCircle color='orange' />
					) : (
						<FaCircle color='red' />
					),
				left_days: verifyNextCalibration(item.next_calibration).leftDays,
				status: item.is_analysis
					? item.calibration_analyses[0].decision_status
					: item.calibration_status,
			}))
			setListCalibration(formatData)
		}
		loadCalibration()
	}, [status])

	const header = [
		{ label: 'Analise', key: 'analysis' },
		{ label: 'Ident.', key: 'identifier' },
		{ label: 'Propr.', key: 'owner' },
		{ label: 'Descrição', key: 'description' },
		{ label: 'Divisão', key: 'division' },
		{ label: 'Capacidade', key: 'capacity' },
		{ label: 'Certificado', key: 'certificate' },
		{ label: 'Localização', key: 'localization' },
		{ label: 'Perid. Calibr.', key: 'periodicity_calibration' },
		{ label: 'Data', key: 'calibration_date' },
		{ label: 'Prox. Calibr.', key: 'next_calibration' },
		{ label: 'Status', key: 'status' },
		{ label: 'Dias restantes', key: 'left_days' },
		{ label: 'Farol', key: 'status_data_calibration' },
	]

	function handleClick(row) {
		const { analysis, status_data_calibration, ...rowChanged } = row
		navigate('/calibration_geral', { state: rowChanged })
	}

	return (
		<Container classNameContainer={styles.container}>
			<Table
				className={styles.table}
				data={listCalibration}
				headers={header}
				title={listCalibration.left_days}
				handleClick={handleClick}
			/>
			<div className={styles.subtitle}>
				<span>NO PRAZO </span>
				<FaCircle color='green' />
				<span>PROXIMO A VENCER </span>
				<FaCircle color='orange' />
				<span>VENCIDO </span>
				<FaCircle color='red' />
			</div>
		</Container>
	)
}
