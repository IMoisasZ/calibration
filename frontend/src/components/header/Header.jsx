// frontend/src/components/Header.js
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import Logo from '../../assets/img/logo_mizp.jpeg'
import { linksHeader } from '../../data/linksHeader.data'

function Header() {
	const [userLogged, setUserLogged] = useState('Moises')
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img
					src={Logo}
					alt='Logo da Aplicação'
				/>
			</div>

			<nav className={styles.nav}>
				<ul>
					{linksHeader.map((link) => {
						return (
							<Link
								to={link.path}
								className={styles.navLink}>
								<li key={link.id}>{link.description}</li>
							</Link>
						)
					})}
				</ul>
			</nav>

			<div className={styles.userAvatar}>
				<Link to='/calibration_config'>
					<p>{userLogged.slice(0, 1)}</p>
				</Link>
			</div>
		</header>
	)
}

export default Header
