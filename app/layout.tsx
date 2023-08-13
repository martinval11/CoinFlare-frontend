import './globals.css';
import type { Metadata } from 'next';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

export const metadata: Metadata = {
	title: 'CryptoHub',
	description: 'View cryptocurrency prices',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body>
				<Nav />
				{children}
				<Footer />
			</body>
		</html>
	);
};

export default RootLayout;
