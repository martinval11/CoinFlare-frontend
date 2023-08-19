'use client';

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

const CryptoChart = ({ coinData }: any) => {
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
		responsive: false,
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		},

		scales: {
			y: {
				display: false,
			},
			x: {
				display: false,
			},
		},

		plugins: {
			legend: {
				display: false,
				position: 'top' as const,
			},
			title: {
				display: false,
				text: '',
			},
			tooltip: {
				enabled: false,
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
				label: '$',
				borderWidth: 6,
				pointStyle: false,
				data: coinData,
				borderColor: '#60df60',
				backgroundColor: '#60df60',
			},
		],
	};

	return <Line options={options} data={data} className="mt-5" />;
};

export default CryptoChart;
