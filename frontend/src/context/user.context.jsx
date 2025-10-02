import React, { createContext, useState, useEffect } from 'react'
import { createMessage, defaultErrorMessage } from '../utils/message.utils'

const User = createContext()

function UserContext({ children }) {
	const [dataUser, setDataUser] = useState([])
	const [userLogged, setUserLogged] = useState('')

	async function login(email, password) {
		try {
		} catch (error) {
			defaultErrorMessage(error)
		}
	}

	return (
		<UserContext.provider
			value={{
				login,
			}}>
			{children}
		</UserContext.provider>
	)
}

export { UserContext }
