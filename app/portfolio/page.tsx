'use client';

import { useEffect, useState } from 'react';

const Portfolio = () => {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		const user = localStorage.getItem('auth');
		if (user === null) {
			window.location.pathname = '/login';
			return;
		}
		setIsAuth(true);
	}, []);

	return (
		<>
			{isAuth ? (
				<>
					<h1>Portfolio</h1>
				</>
			) : (
				<h1>Loading, please wait...</h1>
			)}
		</>
	);
};

export default Portfolio;
