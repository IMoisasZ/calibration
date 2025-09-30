import React from 'react'
import style from './Input.module.css'

export default function Input({
	name = '',
	labelName = 'Title of input',
	type = 'text',
	handleChange = null,
	classNameContainerInput = '',
	value, // Adicionado para receber o valor do estado pai
	min,
	max,
	...rest
}) {
	const isCheckbox = type === 'checkbox'
	const isFile = type === 'file'

	const containerClass = isCheckbox
		? style.containerCheckbox
		: style.containerInput
	const labelClass = isCheckbox ? style.labelCheckbox : style.label
	const inputClass = isCheckbox ? style.checkbox : style.input

	// A lógica de `onChange` é a mesma para todos os tipos.
	const handleOnChange = (e) => {
		if (handleChange) {
			handleChange(e)
		}
	}

	// Renderização do input de arquivo
	if (isFile) {
		return (
			<div className={`${style.containerFile} ${classNameContainerInput}`}>
				<label
					htmlFor={name}
					className={style.labelFile}>
					{labelName}
				</label>
				<input
					type='file'
					name={name}
					id={name}
					onChange={handleOnChange}
					className={style.inputHidden}
					// IMPORTANTE: Nunca defina 'value' para input de arquivo
					{...rest}
				/>
				<span className={style.fileName}>
					{/* O nome do arquivo vem da prop `value` do pai */}
					{value || 'Nenhum arquivo selecionado.'}
				</span>
			</div>
		)
	}

	// Renderização para outros tipos de input
	return (
		<div className={`${containerClass} ${classNameContainerInput}`}>
			<label
				htmlFor={name}
				className={labelClass}>
				{labelName}
			</label>
			<input
				type={type}
				name={name}
				id={name}
				onChange={handleOnChange}
				className={inputClass}
				// O valor vem da prop 'value' do componente pai
				value={value}
				min={min}
				max={max}
				{...rest}
			/>
		</div>
	)
}
