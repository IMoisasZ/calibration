import React from 'react'
import styles from './Container.module.css'

export default function Container({
	children,
	styleContainer,
	title = null,
	classNameContainer = '',
}) {
	return (
		<div
			className={`${styles.container} ${classNameContainer}`}
			style={styleContainer}>
			{title && (
				<>
					<h1>{title}</h1>
				</>
			)}
			{children}
		</div>
	)
}
