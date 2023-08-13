import Link from 'next/link';
import Image from 'next/image';
import styles from './Nav.module.css';

const Nav = () => {
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
				<Link href="/login">Login</Link>
				<Link href="/signup">Sign Up</Link>
			</div>
		</nav>
	);
};

export default Nav;
