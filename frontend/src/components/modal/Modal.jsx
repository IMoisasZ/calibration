import React from 'react'
import styles from './Modal.module.css'

export default function Modal({
	isOpen,
	handleClose,
	classNameContainer = '',
	classNameModalContent = '',
	classNameBtnClose = '',
	classNameHeader = '',
	classNameBody = '',
	classNameActions = '',
	header,
	body,
	actions,
}) {
	/**@description -> if the modal not be open don't rendering nothing */
	if (!isOpen) {
		return null
	}

	return (
		<div
			className={`${styles.modal_overlay} ${classNameContainer}`}
			onClick={handleClose}>
			<div
				className={`${styles.modal_content} ${classNameModalContent} `}
				onClick={(e) => e.stopPropagation()} // Impede que o clique no conteúdo feche o modal
			>
				<button
					className={`${styles.modal_close_btn} ${classNameBtnClose}`}
					onClick={handleClose}>
					&times; {/* Caractere 'x' */}
				</button>
				{/**@description -> header */}
				<div className={`${classNameHeader}`}>
					<h2>{header}</h2>
				</div>
				{/* body */}
				<div className={`${styles.modal_body} ${classNameBody}`}>{body}</div>
				<div className={`${styles.modal_actions} ${classNameActions}`}>
					{actions}
				</div>
			</div>
		</div>
	)
}
