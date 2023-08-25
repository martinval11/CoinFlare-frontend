'use client';

import { FormEvent, useRef, useState } from 'react';

import request from '../utils/request';
import { API_URL } from '../consts/consts';
import { encrypt } from '../utils/cipher';
import { EyeSlashFilledIcon } from '@/components/icons';
import { EyeFilledIcon } from '@/components/icons';

import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { Toaster, toast } from 'sonner';

type ApiResponse = {
	users: string[];
};

const SignUp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isVisiblePwd, setIsVisiblePwd] = useState(false);
	const userRef = useRef<HTMLInputElement>(null);
	const emailRef: any = useRef<HTMLInputElement>(null);
	const pwdRef: any = useRef<HTMLInputElement>(null);

	const toggleVisibilityPwd = () => setIsVisiblePwd(!isVisiblePwd);

	const validatePassword = (pwd: string) => {
		const passwordRegex =
			/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~])(?=.*[a-z]).{8,}$/;

		if (!passwordRegex.test(pwd)) {
			toast.error(
				'Password must contain at least 8 characters, 1 uppercase letter, 1 number and 1 special character'
			);
			return false;
		}
		return true;
	};

	const validateEmail = (email: string) => {
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (!emailRegex.test(email)) {
			toast.error(
				'Email must be in the following order: characters@characters.domain'
			);
			return false;
		}
		return true;
	};

	const createAccount = async (event: FormEvent) => {
		event.preventDefault();

		setIsLoading(true);

		if (!userRef.current?.value || !pwdRef.current?.value) {
			toast.error('Please fill all fields');
			setIsLoading(false);
			return;
		}

		if (
			!validatePassword(pwdRef.current?.value) ||
			!validateEmail(emailRef.current?.value)
		) {
			setIsLoading(false);
			return;
		}

		const dbUsers = await request<ApiResponse | any>(`${API_URL}/users`);

		const userExist = dbUsers.find(
			(user: any) =>
				user.name === userRef.current?.value ||
				user.email === emailRef.current?.value
		);

		if (userExist) {
			toast.error('Username already exist');
			setIsLoading(false);
			return;
		}
		const res: any = await request<ApiResponse>(`${API_URL}/createUser`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: userRef.current?.value,
				email: emailRef.current?.value,
				password: encrypt(pwdRef.current?.value),
				portfolio: [],
			}),
		});
		localStorage.setItem(
			'auth',
			JSON.stringify({ state: true, name: res.name, _id: res._id })
		);

		window.location.pathname = '/';
		setIsLoading(false);
	};

	return (
		<div className="flex justify-center">
			<Toaster richColors closeButton />
			<form onSubmit={createAccount}>
				<h1>Sign Up</h1>

				<label className="block mt-1">
					<span>Username</span>
					<Input type="text" placeholder="Your Name" ref={userRef} />
				</label>

				<label className="block mt-2">
					<span>Email</span>
					<Input
						type="email"
						placeholder="example@gmail.com"
						pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
						title="The Email must be in the following order: characters@characters.domain"
						ref={emailRef}
					/>
				</label>

				<label className="block mt-2">
					<span>Password</span>
					<Input
						type="password"
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

				<Link href="/login" className="block mt-3 link">
					Do you have an account? Login here
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
					Create Account
				</Button>
			</form>
		</div>
	);
};

export default SignUp;
