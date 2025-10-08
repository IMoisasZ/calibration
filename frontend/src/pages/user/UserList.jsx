import React, { useState, useEffect, useCallback } from 'react'
import Container from '../../components/container/Container'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import Table from '../../components/table/Table'
import { getAllUsers } from '../../services/user.service'
import styles from './User.module.css'

export default function UserList({ handleOnEdit, setShowListUser }) {
	const [listUser, setListUser] = useState([])
	const [status, setStatus] = useState(true)

	const loadUsers = useCallback(async () => {
		const dataUser = await getAllUsers(status)

		const dataFormat = dataUser.map((item) => ({
			...item,
			activeStatus: item.active ? 'Sim' : 'Não',
		}))

		setListUser(dataFormat)
	}, [status])

	useEffect(() => {
		loadUsers()
	}, [loadUsers])

	function handleListUser() {
		setShowListUser(false)
	}
	const header = [
		{ label: 'Nome', key: 'user_name' },
		{ label: 'Email', key: 'email' },
		{ label: 'Tipo de usuario', key: 'role' },
		{ label: 'Ativo', key: 'activeStatus' },
	]

	return (
		<Container
			title='Lista de usuários'
			classNameContainer={styles.container_list}>
			<div className={styles.container_input_button}>
				<Input
					type='checkbox'
					name='status'
					checked={status}
					handleChange={() => setStatus(!status)}
					labelName='Mostrar apenas usuários ativos?'
					classNameContainerInput={styles.checkbox_status}
				/>
				<Button
					type='button'
					title='Clique para incluir um usuário!'
					nameBtn='Incluir usuário'
					handleClick={handleListUser}
				/>
			</div>
			<Table
				data={listUser}
				headers={header}
				handleClick={(row) => handleOnEdit(row)}
			/>
		</Container>
	)
}
