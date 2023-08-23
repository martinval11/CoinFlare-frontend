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
import request from '../utils/request';

const Coin = () => {
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
					[coinData?.prices?.[0][0], coinData?.prices?.[0][1]],
					[coinData?.prices?.[1][0], coinData?.prices?.[1][1]],
					[coinData?.prices?.[2][0], coinData?.prices?.[2][1]],
					[coinData?.prices?.[3][0], coinData?.prices?.[3][1]],
					[coinData?.prices?.[4][0], coinData?.prices?.[4][1]],
					[coinData?.prices?.[5][0], coinData?.prices?.[5][1]],
					[coinData?.prices?.[6][0], coinData?.prices?.[6][1]],
				],
				//coinData?.prices?.map((item: any) => [item[0], item[1]]),
				borderColor: '#60df60',
				backgroundColor: '#60df60',
			},
		],
	};

	const getCoinData = async () => {
		const coins = await request(
			`https://api.coingecko.com/api/v3/coins/${coinName}/market_chart?vs_currency=usd&days=7`
		);
		setCoinData(coins);
	};

	useEffect(() => {
		getCoinData();
	}, []);

	return (
		<main>
			<div>
				<div className="flex">
					<h1>{coinName.charAt(0).toUpperCase() + coinName.slice(1)}</h1>
					<small>{coinSymbol.toUpperCase()}</small>
				</div>
				<h2>Current Price: ${coinPrice}</h2>
			</div>
			<Line options={options} data={data} className="mt-5" id="coin-canvas" />
		</main>
	);
};

export default Coin;
