import CoinTable from './components/CoinTable/CoinTable';
import styles from './page.module.css';

export default function Home({ data }: any) {
	return (
		<main className={styles.main}>
      <CoinTable />
		</main>
	);
}