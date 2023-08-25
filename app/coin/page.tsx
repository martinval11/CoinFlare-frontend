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
import { Chip } from '@nextui-org/chip';

import { useEffect, useState } from 'react';
import request from '../utils/request';

const Coin = () => {
	const [coinData, setCoinData]: any = useState([]);
	const searchParams = useSearchParams();
	const coinName: any = searchParams.get('id');

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
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		},
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

	const data: any = {
		labels,
		datasets: [
			{
				label: '$',
				pointRadius: 0,
				pointHitRadius: 10,
				lineTension: 0.2,
				borderWidth: 4,
				borderJoinStyle: 'round',
				borderCapStyle: 'round',
				data: [
					coinData?.sparkline_in_7d?.price[0],
					coinData?.sparkline_in_7d?.price[1],
					coinData?.sparkline_in_7d?.price[2],
					coinData?.sparkline_in_7d?.price[3],
					coinData?.sparkline_in_7d?.price[4],
					coinData?.sparkline_in_7d?.price[5],
					coinData?.sparkline_in_7d?.price[6],
					coinData?.sparkline_in_7d?.price[7],
				],
				borderColor: '#60df60',
				backgroundColor: '#60df60',
			},
		],
	};

	const getCoinData = async () => {
		const localCoins = localStorage.getItem('coins');
		if (localCoins && localCoins !== 'undefined') {
			// find coin in local storage
			const jsonCoinData = JSON.parse(localCoins);
			const coin = jsonCoinData.find((item: any) => item.id === coinName);
			if (coin) {
				setCoinData(coin);
			}
			return;
		}

		const coins: any = await request(
			'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=%221h%2C%2024h%2C%207d%22&locale=en'
		);

		const coin = coins.find((item: any) => item.id === coinName);
		if (coin && coinData !== undefined) {
			setCoinData(coin);
			// cache coins
			localStorage.setItem('coins', JSON.stringify(coins));
		}
	};

	useEffect(() => {
		getCoinData();
	}, []);

	return (
		<main>
			<div className='mb-3'>
				<div className="flex">
					<h1>{coinData?.name ?? 'Loading...'}</h1>
					<small>{coinData?.symbol?.toUpperCase()}</small>
				</div>

				<Chip color="danger" variant="flat">
					{coinData.price_change_percentage_24h}%
				</Chip>
				<h2>Current Price: ${coinData?.current_price}</h2>
			</div>
			<Line options={options} data={data} id="coin-canvas" />
		</main>
	);
};

export default Coin;
