import styles from './Footer.module.css';
export default function Footer() {
	return (
		<footer className={styles.footer}>
			Made with ❤️ by
			<a
				href='https://github.com/martinval11'
				target='_blank'
				rel='noopener noreferrer'>
				Martínval11
			</a>
		</footer>
	);
}
