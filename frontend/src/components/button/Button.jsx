// frontend/src/components/Button/Button.js
import React from 'react'
import style from './Button.module.css'
import { btnsIcons } from '../../data/btn_icons.data'

export default function Button({
	type = 'button',
	disabled = false,
	hidden = false,
	nameBtn = '',
	classNameButton = '',
	handleClick = null,
	iconName = '',
	title = '',
	btnIconName = '',
}) {
	/**@description -> Verify if exist icon */
	const hasIcon = iconName && btnsIcons[iconName]

	return (
		<button
			className={`${style.button} ${disabled ? style.disabled : ''} ${
				iconName && style.icon
			} ${classNameButton}`}
			type={type}
			disabled={disabled}
			hidden={hidden}
			onClick={handleClick}
			title={title}
			btnIconName={btnIconName}>
			{hasIcon && <span>{btnsIcons[iconName].icon}</span>}
			{nameBtn && <span className={style.name}>{nameBtn}</span>}
		</button>
	)
}
