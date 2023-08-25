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
  const router = useRouter();

  const removeData = () => {
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
          <Button color="primary" href="/" onClick={removeData}>
            Logout
          </Button>
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
