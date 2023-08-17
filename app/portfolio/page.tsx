'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

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
	priceInUSD: number;
}

const Portfolio = () => {
	const [isAuth, setIsAuth] = useState(false);
	const [coins, setCoins] = useState([]);
	const [portfolio, setPortfolio]: any = useState([]);

	const [crypto, setCrypto] = useState('');
	const priceRef: any = useRef(0);

	const getCoins = async () => {
		const res = await fetch();
		'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
		const coins = await res.json();

		setCoins(coins);
		return coins;
	};

	const selectCryptoChange = (event: any) => {
		setCrypto(event.currentTarget.value);
	};

	const submitPortfolio = (event: FormEvent) => {
		event.preventDefault();

		const findCoin: any = coins.find((coin: coin) => coin.id === crypto);

		if (findCoin) {
			setPortfolio([
				...portfolio,
				{
					name: crypto,
					priceInUSD: (priceRef.current.value / findCoin.current_price).toFixed(
						6
					),
				},
			]);
		}
	};

	useEffect(() => {
		const user = localStorage.getItem('auth');
		if (user === null) {
			window.location.pathname = '/login';
			return;
		}
		setIsAuth(true);
		getCoins();
	}, []);

	return (
		<main className={styles.container}>
			{isAuth ? (
				<section className={styles.portfolio}>
					<h1>Portfolio</h1>
					<form onSubmit={submitPortfolio} className={styles.form}>
						<h2>Add a cryptocurrency</h2>
						<label>
							<span>Select a cryptocurrency</span>
							<select
								onChange={selectCryptoChange}
								defaultValue="none"
								required
							>
								<option value="none" id="none" disabled hidden>
									Select an Option
								</option>
								{coins.map((coin: coin) => (
									<option value={coin.id} key={coin.id}>
										{coin.name}
									</option>
								))}
							</select>
						</label>

						<label>
							<span>Quantity (In USD)</span>
							<input type="number" ref={priceRef} required />
						</label>

						<input type="submit" value="Add" className={styles.submitButton} />
					</form>

					{portfolio.length === 0 ? (
						<p>No coins added</p>
					) : (
						portfolio.map((coin: coin) => (
							<>
								<p key={coin.id}>
									{coin.name} - ${coin.priceInUSD}
								</p>
							</>
						))
					)}
				</section>
			) : (
				<h1>Loading, please wait...</h1>
			)}
		</main>
	);
};

export default Portfolio;
