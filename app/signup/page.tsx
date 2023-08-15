'use client';

import { FormEvent, useRef } from 'react';
import Link from 'next/link';

import styles from './page.module.css';

import request from '../utils/request';

import { API_URL } from '../consts/consts';
import { encrypt } from '../utils/cipher';

type ApiResponse = {
	users: string[];
};

const SignUp = () => {
	const userRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const pwdRef: any = useRef<HTMLInputElement>(null);

	const createAccount = async (event: FormEvent) => {
		event.preventDefault();

		const dbUsers = await request<any>(`${API_URL}/users`);

		const userExist = dbUsers.find(
			(user: any) =>
				user.name === userRef.current?.value ||
				user.email === emailRef.current?.value
		);

		if (userExist) {
			alert('Username already exist');
			return;
		}
		await request<ApiResponse>(`${API_URL}/createUser`, {
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
			JSON.stringify({ state: true, name: userRef.current?.value })
		);

		window.location.pathname = '/';
	};

	return (
		<div className={styles.formContainer}>
			<form onSubmit={createAccount} className={styles.form}>
				<h1>Sign Up</h1>

				<label>
					<span>Username</span>
					<input type="text" placeholder="Your Name" ref={userRef} required />
				</label>

				<label>
					<span>Email</span>
					<input
						type="email"
						placeholder="example@gmail.com"
						pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
						title="The Email must be in the following order: characters@characters.domain"
						ref={emailRef}
						required
					/>
				</label>

				<label>
					<span>Password</span>
					<input
						type="password"
						minLength={8}
						maxLength={30}
						placeholder="At least 8 characters"
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
						title="The Password must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters."
						ref={pwdRef}
						required
					/>
				</label>

				<Link href="/signup" className={styles.link}>
					Do you have an account? Login here
				</Link>

				<input
					type="submit"
					value="Create Account"
					className={styles.submitButton}
				/>
			</form>
		</div>
	);
};

export default SignUp;
