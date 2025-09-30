import React from 'react'
import styles from './TextArea.module.css'

export default function TextArea({
	name,
	labelName,
	classNameTextArea,
	classNameContainerTextArea,
	value,
	handleChange,
	quantityTotal = 500,
	quantityUsed = 0,
	...rest
}) {
	return (
		<div
			className={`${styles.containerTextArea} ${classNameContainerTextArea}`}>
			<label htmlFor={name}>{labelName}</label>
			<textarea
				id={name}
				name={name}
				className={classNameTextArea}
				value={value}
				onChange={handleChange}
				{...rest}
			/>
			<span>
				{quantityUsed}/{quantityTotal}
			</span>
		</div>
	)
}
