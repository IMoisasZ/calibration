import React from 'react'

export default function Form({
	children,
	handleSubmit = null,
	classNameForm,
	noValidate,
}) {
	return (
		<form
			className={`${classNameForm}`}
			onSubmit={handleSubmit}
			encType='multipart/form-data'
			noValidate={noValidate}>
			{children}
		</form>
	)
}
