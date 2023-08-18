'use client';

import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from '@nextui-org/navbar';
import { Button } from '@nextui-org/button';
import { Kbd } from '@nextui-org/kbd';
import { Link } from '@nextui-org/link';
import { Input } from '@nextui-org/input';

import { link as linkStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

import { ThemeSwitch } from '@/components/theme-switch';
import { GithubIcon, SearchIcon } from '@/components/icons';

import { Logo } from '@/components/icons';

export const Navbar = () => {
	const [isAuth, setIsAuth] = useState(false);

	const removeData = () => {
		localStorage.removeItem('auth');
		window.location.reload();
	};

	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setIsAuth(true);
		}
	}, []);

	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: 'bg-default-100',
				input: 'text-sm',
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={['command']}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="flex-shrink-0 text-base pointer-events-none text-default-400" />
			}
			type="search"
		/>
	);

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex items-center justify-start gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">CryptoHub</p>
					</NextLink>
				</NavbarBrand>
				<ul className="justify-start hidden ml-2 lg:flex gap-4">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: 'foreground' }),
									'data-[active=true]:text-primary data-[active=true]:font-medium'
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<Link isExternal href={siteConfig.links.github} aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>

				<Link href="/portfolio">Portfolio</Link>
				{isAuth ? (
					<Button href="/" onClick={removeData}>
						Logout
					</Button>
				) : (
					<>
						<NavbarItem>
							<Link href="/login">Login</Link>
						</NavbarItem>
						<NavbarItem className="hidden md:flex">
							<Button
								isExternal
								as={Link}
								className="text-sm font-normal text-default-600 bg-default-100"
								href={siteConfig.links.signup}
								variant="flat"
							>
								Sign Up
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>

			<NavbarContent className="pl-4 sm:hidden basis-1" justify="end">
				<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{searchInput}
				<div className="flex flex-col mx-4 mt-2 gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? 'primary'
										: index === siteConfig.navMenuItems.length - 1
										? 'danger'
										: 'foreground'
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
