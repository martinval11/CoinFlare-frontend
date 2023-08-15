'use client';

import Link from 'next/link';
import styles from './Nav.module.css';

import { useState, useEffect } from 'react';

const Nav = () => {
	const [isAuth, setIsAuth] = useState(false);

	const removeData = () => {
		localStorage.removeItem('auth');
		window.location.reload();
	};

	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setIsAuth(true);
		}
	}, []);

	return (
		<nav className={styles.nav}>
			<Link href="/" className={styles.logo}>
				<img
					src="/favicon.ico"
					alt="CryptoHub Logo"
					width={50}
					height={50}
					loading="lazy"
				/>
				<h1>CryptoHub</h1>
			</Link>

			<div className={styles.links}>
				<Link href="/portfolio">Portfolio</Link>
				{isAuth ? (
					<Link href="/" onClick={removeData}>
						Logout
					</Link>
				) : (
					<>
						<Link href="/login">Login</Link>
						<Link href="/signup">Sign Up</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
