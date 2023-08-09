import Link from 'next/link';
import styles from './Nav.module.css';

export default function Nav() {
	return (
		<nav className={styles.nav}>
			<Link href='/' className={styles.logo}>
				<img src="/favicon.ico" alt="CryptoHub Logo" />
				<h1>CryptoHub</h1>
			</Link>

			<Link href='/'>Portfolio (Coming Soon)</Link>
		</nav>
	);
}
