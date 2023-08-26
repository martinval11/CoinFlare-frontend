'use client';

import { FormEvent, useRef, useState } from 'react';

import { API_URL } from '../consts/consts';
import request from '../utils/request';
import { decrypt } from '../utils/cipher';
import { EyeSlashFilledIcon } from '@/components/icons';
import { EyeFilledIcon } from '@/components/icons';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';

interface user {
  _id: string;
  name: string;
  email: string;
  password: string;
  portfolio: Array<string>;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
	const [isVisiblePwd, setIsVisiblePwd] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const pwdRef: any = useRef<HTMLInputElement>(null);
	
  const toggleVisibilityPwd = () => setIsVisiblePwd(!isVisiblePwd);

  const login = async (event: FormEvent) => {
    event.preventDefault();

    if (!userRef.current?.value || !pwdRef.current?.value) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setIsLoading(true);
      const users: any = await request(`${API_URL}/users`);
      const user = users.find(
        (user: user) => user.name === userRef.current?.value
      );

      if (!user) {
        toast.error('User not found');
        setIsLoading(false);
        return;
      }
      if (pwdRef.current.value !== decrypt(user.password)) {
        toast.error('Incorrect password');
        setIsLoading(false);
        return;
      }
      localStorage.setItem(
        'auth',
        JSON.stringify({ state: true, name: user.name, _id: user._id })
      );
      window.location.pathname = '/';
    } catch (error) {
      setIsLoading(false);
			toast.error('Something went wrong. Please try again later');
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <div className="flex justify-center">
      <Toaster richColors closeButton />
      <form onSubmit={login}>
        <h1>Login</h1>

        <label className="block mt-1">
          <span>Username</span>
          <Input type="text" placeholder="Your Name" ref={userRef} required />
        </label>

        <label className="block mt-2">
          <span>Password</span>

          <Input
						placeholder="Your Password"
						ref={pwdRef}
						endContent={
							<button
								className="focus:outline-none"
								type="button"
								onClick={toggleVisibilityPwd}
							>
								{isVisiblePwd ? (
									<EyeSlashFilledIcon className="text-2xl pointer-events-none text-default-400" />
								) : (
									<EyeFilledIcon className="text-2xl pointer-events-none text-default-400" />
								)}
							</button>
						}
						type={isVisiblePwd ? 'text' : 'password'}
					/>

        </label>

        <Link href="/signup" className="block mt-3 link">
          You don&apos;t have an account? Sign up here
        </Link>

        <Button
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
          className="w-full mt-3"
          variant="solid"
          color="primary"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
