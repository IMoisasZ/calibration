// frontend/src/components/Table/Table.js
import React from 'react'
import styles from './Table.module.css'
import Button from '../button/Button'

export default function Table({
	headers,
	data,
	handleEdit = null,
	toggleStatus = null,
	className = '',
	handleClick = null,
}) {
	return (
		<table className={`${styles.table} ${className}`}>
			<thead>
				<tr>
					{headers?.map((header, index) => (
						<th
							key={index}
							colSpan={header.label === 'Ações' ? 2 : 1}
							style={
								header.label === 'Ações'
									? { textAlign: 'center' }
									: { textAlign: 'left' }
							}>
							{header.label}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data?.map((row, rowIndex) => (
					<tr
						key={rowIndex}
						onClick={() => handleClick && handleClick(row)}>
						{headers?.map((header, cellIndex) =>
							header.label !== 'Ações' ? (
								<td
									className={
										row.active && row.active ? styles.enabled : styles.disabled
									}
									key={cellIndex}>
									{row[header.key]}
								</td>
							) : (
								<td
									style={{ display: 'flex', justifyContent: 'space-around' }}
									className={
										row.active && row.active ? styles.enabled : styles.disabled
									}
									key={cellIndex}>
									{toggleStatus && (
										<Button
											iconName={
												row.active && row.active ? 'enabled' : 'disabled'
											}
											title={
												row.active && row.active
													? 'Clique para desativar!'
													: 'Clique para ativar'
											}
											handleClick={() => toggleStatus(row)}
										/>
									)}
									{handleEdit && (
										<Button
											iconName='edit'
											handleClick={() => handleEdit(row)}
											type='button'
											title='Clique para editar!'
										/>
									)}
								</td>
							)
						)}
					</tr>
				))}
			</tbody>
		</table>
	)
}
