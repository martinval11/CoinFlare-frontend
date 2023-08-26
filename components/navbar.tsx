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
import { Input } from '@nextui-org/input';

import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import { useState, useEffect, FormEvent, useRef } from 'react';

import { ThemeSwitch } from '@/components/theme-switch';
import { GithubIcon, SearchIcon } from '@/components/icons';

import { Logo } from '@/components/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const searchInputRef: any = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const removeData = () => {
    setIsLoading(true);
    localStorage.removeItem('auth');
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
  }, []);

  const searchSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push(`/search?coin=${searchInputRef.current.value.toLowerCase()}`);
  };

  const searchInput = (
    <form onSubmit={searchSubmit}>
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm',
        }}
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="flex-shrink-0 text-base pointer-events-none text-default-400" />
        }
        type="search"
        ref={searchInputRef}
      />
    </form>
  );

  const LogoutButton = () => {
    return (
      <Button
        href="/"
        onClick={removeData}
        isLoading={isLoading}
        spinner={
          <svg
            className="w-5 h-5 animate-spin text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        }
        type="submit"
        variant="solid"
        color="primary"
      >
        Logout
      </Button>
    );
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">CoinFlare</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            target="_blank"
            href={siteConfig.links.github}
            aria-label="Github"
          >
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>

        <Link href="/portfolio" className="link">
          Portfolio
        </Link>
        {isAuth ? (
          <LogoutButton />
        ) : (
          <>
            <NavbarItem>
              <Link href="/login" className="link">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem className="hidden md:flex">
              <Button
                as={Link}
                href={siteConfig.links.signup}
                color="primary"
                variant="solid"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent className="pl-4 sm:hidden basis-1" justify="end">
        <Link href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="flex flex-col mx-4 mt-2 gap-2">
          <NavbarMenuItem>
            <Link href="/" className="link">
              Home
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem>
            <Link href="/portfolio" className="link">
              Portfolio
            </Link>
          </NavbarMenuItem>

          {isAuth ? (
            <NavbarMenuItem>
              <Link href="/" className="link" onClick={removeData}>
                Logout
              </Link>
            </NavbarMenuItem>
          ) : (
            <>
              <NavbarMenuItem>
                <Link href="/login" className="link">
                  Login
                </Link>
              </NavbarMenuItem>

              <NavbarMenuItem>
                <Link href="/portfolio" className="link">
                  Sign Up
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
