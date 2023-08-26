import '@/styles/globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Providers } from './providers';
import { Navbar } from '@/components/navbar';
import { Link } from '@nextui-org/link';
import clsx from 'clsx';
import { HeartFilledIcon } from '@/components/icons';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx('min-h-screen bg-background font-sans antialiased')}
			>
				<Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<main className="container flex-grow px-6 pt-16 mx-auto max-w-7xl">
							{children}
						</main>
						<footer className="flex items-center justify-center w-full py-3">
							<span className="flex text-default-600 gap-1">
								Made with <HeartFilledIcon /> by{' '}
								<Link
									href="https://github.com/martinval11"
									target="_blank"
									rel="noopener noreferrer"
								>
									Martínval11
								</Link>
							</span>
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
