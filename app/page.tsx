import CoinTable from './components/CoinTable/CoinTable';
import styles from './page.module.css';

const Home = () => {
	return (
		<main className={styles.main}>
      <CoinTable />
		</main>
	);
}

export default Home;
