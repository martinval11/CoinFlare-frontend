import styles from './CoinTable.module.css';

const getCoins = async () => {
	const res = await fetch(
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
	);
	const coins = await res.json();

	return coins;
};

export default async function CoinTable() {
	const coins = await getCoins();

	return (
		<table className={styles.table}>
			<thead className={styles.header}>
				<tr>
					<th>#</th>
					<th>Coin</th>
					<th>Price</th>
					<th>24h</th>
					<th>Market Cap</th>
				</tr>
			</thead>
			<tbody>
				{coins.map((coin: any) => (
					<tr className={styles.coin}>
						<td>{coin.market_cap_rank}</td>
						<td className={styles.name}>
							<img
								src={coin.image}
								alt={coin.name}
							/>
							{coin.name}
						</td>
						<td>${coin.current_price.toLocaleString()}</td>
						<td
							className={
								coin.price_change_percentage_24h > 0 ? styles.green : styles.red
							}>
							{coin.price_change_percentage_24h}%
						</td>
						<td>${coin.market_cap.toLocaleString()}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
