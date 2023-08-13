'use client';

import { FormEvent } from 'react';

import styles from './page.module.css';

const SignUp = () => {
	const createAccount = (event: FormEvent) => {
		event.preventDefault();
		console.info('Form');
	};

	return (
		<div className={styles.formContainer}>
			<form onSubmit={createAccount} className={styles.form}>
				<h1>Sign Up</h1>

				<label>
					<span>Username</span>
					<input type="text" placeholder='Your Name' required />
				</label>

				<label>
					<span>Email</span>
					<input type="email" placeholder='example@gmail.com' required />
				</label>

				<label>
					<span>Password</span>
					<input type="password" minLength={8} maxLength={30} placeholder='Minimum 8 characters' required />
				</label>

				<input type="submit" value="Create Account" className={styles.submitButton} />
			</form>
		</div>
	);
};

export default SignUp;
