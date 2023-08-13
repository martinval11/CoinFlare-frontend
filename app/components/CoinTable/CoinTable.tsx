import Link from 'next/link';
import { StarIcon } from '../icons/Icons';
import styles from './CoinTable.module.css';
import Image from 'next/image';

interface coin {
	id: string;
	symbol: string;
	name: string;
	image: string;
	current_price: number;
	market_cap: number;
	market_cap_rank: number;
	fully_diluted_valuation: number;
	total_volume: number;
	high_24h: number;
	low_24h: number;
	price_change_24h: number;
	price_change_percentage_24h: number;
	market_cap_change_24h: number;
	market_cap_change_percentage_24h: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	ath: number;
	ath_change_percentage: number;
	ath_date: string;
	atl: number;
	atl_change_percentage: number;
	atl_date: string;
	roi: boolean;
	last_updated: string;
}

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
		<div className={styles.tableContainer}>
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
					{coins.map((coin: coin) => (
						<tr className={styles.coin} key={coin.id}>
							<td>
								<div className={styles.center}>
									<StarIcon /> {coin.market_cap_rank}
								</div>
							</td>
							<Link
								href={{
									pathname: '/coin',
									query: {
										id: coin.id,
										price: coin.current_price,
										symbol: coin.symbol,
									},
								}}
								key={coin.id}
							>
								<td className={styles.name}>
									<img
										src={coin.image}
										alt={coin.name}
										loading="lazy"
										width={40}
										height={40}
									/>
									{coin.name} <small>{coin.symbol.toUpperCase()}</small>
								</td>
							</Link>

							<td>${coin.current_price.toLocaleString()}</td>
							<td
								className={
									coin.price_change_percentage_24h > 0
										? styles.green
										: styles.red
								}
							>
								{coin.price_change_percentage_24h}%
							</td>
							<td>${coin.market_cap.toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
