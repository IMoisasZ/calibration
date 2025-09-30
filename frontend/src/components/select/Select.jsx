import React from 'react'
import styles from './Select.module.css'

export default function Select({
	label,
	name,
	options,
	value,
	handleChange,
	className,
	valueKey,
	labelKey,
	defaultName = 'Selecione uma informação',
}) {
	return (
		<div className={`${styles.selectContainer} ${className}`}>
			{label && <label htmlFor={name}>{label}</label>}
			<select
				name={name}
				id={name}
				value={value}
				onChange={handleChange}
				className={styles.select}>
				<option value={0}>{defaultName}</option>
				{options?.map((option) => (
					<option
						key={option[valueKey]}
						value={option[valueKey]}>
						{option[labelKey]}
					</option>
				))}
			</select>
		</div>
	)
}
