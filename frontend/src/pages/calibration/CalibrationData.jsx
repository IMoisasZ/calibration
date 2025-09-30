import React from 'react'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import CalibrationInfoItems from './CalibrationInfoItems'
import styles from './Calibration.module.css'

export default function CalibrationData({
	formData,
	handleChange,
	setFormData,
	handleFileChange,
	handleImmediateSearch, // Recebido, mas não usado diretamente no botão de lupa
	handleOpenListEquipment, // NOVO: Função para abrir a lista
}) {
	return (
		<>
			<div className={styles.container_div}>
				<Input
					type='text'
					labelName='Identificação'
					name='identifierNumber'
					classNameContainerInput={`${styles.input}`}
					value={formData.calibrationOthers.identifierNumber?.toUpperCase()}
					handleChange={handleChange}
					disabled={formData.calibrationOthers.disabled}
				/>
				{formData.calibrationOthers.equipment ? (
					<p
						className={`${styles.data_equipment_info_default} ${styles.data_equipment_info} `}>
						{formData.calibrationOthers.equipment.description}
					</p>
				) : (
					<p className={styles.data_equipment_info_default}></p>
				)}
				<Button
					iconName='search'
					type='button'
					title={
						formData.calibrationOthers.disabled
							? 'Botão desativado!'
							: 'Clique para pesquisar o item!'
					}
					classNameButton={`${styles.button}`}
					handleClick={handleOpenListEquipment}
					disabled={formData.calibrationOthers.disabled}
				/>
				{formData.calibrationData.calibration_status && (
					<p
						className={`${styles.status_calibration}
							${
								formData.calibrationData.calibration_status === 'APROVADO'
									? styles.status_approved
									: formData.calibrationData.calibration_status === 'REPROVADO'
									? styles.status_reproved
									: styles.status_analysis
							}`}>
						Status: <br />
						{formData.calibrationData.calibration_status}
					</p>
				)}
			</div>
			{formData.calibrationOthers.equipment ? (
				<CalibrationInfoItems
					equipment={formData.calibrationOthers.equipment}
				/>
			) : (
				<p className={styles.error_equipment}>
					{formData.calibrationOthers.error?.toUpperCase()}
				</p>
			)}
			{formData.calibrationOthers.loading && <p>Carregando...</p>}
			<div className={styles.div_data_calibration}>
				<Input
					labelName='Data calibração'
					type='date'
					value={formData.calibrationData.calibration_date}
					handleChange={handleChange}
					name='calibration_date'
					classNameContainerInput={`${styles.input} ${styles.input_date}`}
					disabled={formData.calibrationOthers.disabled}
				/>
				<Input
					labelName='Próxima calibração'
					type='date'
					value={formData.calibrationData.next_calibration}
					handleChange={handleChange}
					name='next_calibration'
					classNameContainerInput={`${styles.input} ${styles.input_date}`}
					disabled={formData.calibrationOthers.disabled}
				/>
				<Input
					labelName='Número do certificado'
					type='text'
					value={formData.calibrationData.certificate_number?.toUpperCase()}
					handleChange={handleChange}
					name='certificate_number'
					classNameContainerInput={`${styles.input} ${styles.input_certificate_number}`}
					disabled={formData.calibrationOthers.disabled}
				/>
				<Input
					labelName='Certificado'
					type='file'
					value={formData.calibrationData.certificate_file}
					handleChange={handleFileChange}
					name='certificate_file'
					classNameContainerInput={`${styles.input} ${styles.input_certificate_file}`}
					disabled={formData.calibrationOthers.disabled}
				/>
			</div>
		</>
	)
}
