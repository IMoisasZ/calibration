// frontend/src/components/Header.js
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import Logo from '../../assets/img/logo_mizp.jpeg'
import Button from '../button/Button'
import { linksHeader } from '../../data/linksHeader.data'
import { useUser } from '../../context/user.context' // Importação correta do hook

function Header() {
	// 1. ✅ Desestrutura APENAS o que é necessário e use diretamente.
	// user: objeto completo do usuário (pode ser null)
	// isLogged: booleano (true ou false)
	const { user, isLogged, logout } = useUser()

	const navigate = useNavigate()

	// 2. ✅ Obtém o nome de usuário diretamente do objeto 'user'
	// Garantindo que 'user' não seja null antes de tentar acessar 'name'
	const userName = user?.name

	// A navegação só aparece se isLogged for TRUE (ou se user for um objeto válido)
	const shouldShowNavigation = isLogged && userName

	function logoutFunction() {
		logout()
		navigate('/')
	}

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img
					src={Logo}
					alt='Logo da Aplicação'
				/>
			</div>

			{/* 3. ✅ Use 'shouldShowNavigation' para renderização condicional */}
			{shouldShowNavigation ? (
				<>
					<nav className={styles.nav}>
						<ul>
							{linksHeader.map((link) => (
								// 🚨 O 'key' deve ser colocado no elemento Link
								<Link
									to={link.path}
									className={styles.navLink}
									key={link.id}>
									<li>{link.description}</li>
								</Link>
							))}
							{/* Adicionar um botão de Logout aqui é uma boa prática */}
							<Button
								type='button'
								title='Clique para sair'
								handleClick={logoutFunction}
								iconName='close'
							/>
						</ul>
					</nav>

					<div className={styles.userAvatar}>
						<Link to='/user_menu'>
							{/* Use 'userName' diretamente, garantindo que existe antes de slice */}
							<p>{userName.slice(0, 1).toUpperCase()}</p>
						</Link>
					</div>
				</>
			) : (
				// 4. Se não estiver logado, pode mostrar o link de Login
				<div className={styles.nav}>
					<Link
						to='/login'
						className={styles.navLink}>
						<p>Login</p>
					</Link>
				</div>
			)}
		</header>
	)
}

export default Header
