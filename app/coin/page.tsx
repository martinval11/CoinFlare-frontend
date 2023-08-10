'use client';

import { useSearchParams } from 'next/navigation';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

import styles from './page.module.css';

export default function Coin() {
	const [coinData, setCoinData]: any = useState([]);
	const searchParams = useSearchParams();
	const coinName: any = searchParams.get('id');
	const coinPrice: any = searchParams.get('price');
	const coinSymbol: any = searchParams.get('symbol');

	ChartJS.register(
		CategoryScale,
		LinearScale,
		PointElement,
		LineElement,
		Title,
		Tooltip,
		Legend
	);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
				position: 'top' as const,
			},
			title: {
				display: false,
				text: 'Ethereum',
			},
		},
	};

	const labels = [
		'Day 1',
		'Day 2',
		'Day 3',
		'Day 4',
		'Day 5',
		'Day 6',
		'Day 7',
	];

	const data = {
		labels,
		datasets: [
			{
				label: 'Dataset 1',
				data: [
					coinData?.prices?.at(-1)[1],
					coinData?.prices?.at(-2)[1],
					coinData?.prices?.at(-3)[1],
					coinData?.prices?.at(-4)[1],
					coinData?.prices?.at(-5)[1],
					coinData?.prices?.at(-6)[1],
					coinData?.prices?.at(-7)[1],
				],
				borderColor: '#60df60',
				backgroundColor: '#60df60',
			},
		],
	};
	const getCoinData = async () => {
		const res = await fetch(
			`https://api.coingecko.com/api/v3/coins/${coinName}/market_chart?vs_currency=usd&days=7`
		);
		const coins = await res.json();
		setCoinData(coins);
	};

	useEffect(() => {
		getCoinData();
	}, []);

	return (
		<main className={styles.chartContainer}>
			<div className={styles.coinInfo}>
				<div>
					<h1>{coinName.charAt(0).toUpperCase() + coinName.slice(1)}</h1>
					<small>{coinSymbol.toUpperCase()}</small>
				</div>
				<h2>Current Price: ${coinPrice}</h2>
			</div>
			<Line
				options={options}
				data={data}
				className={styles.chart}
			/>
		</main>
	);
}
