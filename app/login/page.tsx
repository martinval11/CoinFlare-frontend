'use client';

import { FormEvent, useRef } from 'react';
import Link from 'next/link';

import { API_URL } from '../consts/consts';
import request from '../utils/request';

import styles from './page.module.css';
import { decrypt } from '../utils/cipher';

interface user {
	_id: string;
	name: string;
	email: string;
	password: string;
	portfolio: Array<string>;
}

const Login = () => {
	const userRef = useRef<HTMLInputElement>(null);
	const pwdRef: any = useRef<HTMLInputElement>(null);

	const login = async (event: FormEvent) => {
		event.preventDefault();

		const users: any = await request(`${API_URL}/users`);

		const user = users.find(
			(user: user) => user.name === userRef.current?.value
		);

		if (!user) {
			alert('User not found');
			return;
		}
		if (pwdRef.current.value !== decrypt(user.password)) {
			alert('Incorrect password');
			return;
		}
		localStorage.setItem(
			'auth',
			JSON.stringify({ state: true, name: user.name })
		);
		window.location.pathname = '';
	};

	return (
		<div className={styles.formContainer}>
			<form onSubmit={login} className={styles.form}>
				<h1>Login</h1>

				<label>
					<span>Username</span>
					<input type="text" placeholder="Your Name" ref={userRef} required />
				</label>

				<label>
					<span>Password</span>
					<input
						type="password"
						placeholder="Your Password"
						ref={pwdRef}
						required
					/>
				</label>

				<Link href="/signup" className={styles.link}>
					You don&apos;t have an account? Sign up here
				</Link>

				<input type="submit" value="Login" className={styles.submitButton} />
			</form>
		</div>
	);
};

export default Login;
