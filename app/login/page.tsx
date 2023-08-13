'use client';

import { FormEvent } from 'react';

import styles from './page.module.css';

const Login = () => {
	const login = (event: FormEvent) => {
		event.preventDefault();
		console.info('Form');
	};

	return (
		<div className={styles.formContainer}>
			<form onSubmit={login} className={styles.form}>
				<h1>Login</h1>

				<label>
					<span>Username</span>
					<input type="text" placeholder="Your Name" required />
				</label>

				<label>
					<span>Password</span>
					<input type="password" placeholder="Your Password" required />
				</label>

				<input type="submit" value="Login" className={styles.submitButton} />
			</form>
		</div>
	);
};

export default Login;
