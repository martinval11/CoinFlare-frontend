'use client';

import { FormEvent, useRef } from 'react';

import { API_URL } from '../consts/consts';
import request from '../utils/request';

import { decrypt } from '../utils/cipher';
import { Link } from '@nextui-org/react';
import { Input } from '@nextui-org/input';

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
      JSON.stringify({ state: true, name: user.name, _id: user._id })
    );
    window.location.pathname = '';
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={login}>
        <h1>Login</h1>

        <label className="block mt-1">
          <span>Username</span>
          <Input type="text" placeholder="Your Name" ref={userRef} required />
        </label>

        <label className="block mt-2">
          <span>Password</span>
          <Input
            type="password"
            placeholder="Your Password"
            ref={pwdRef}
            required
          />
        </label>

        <Link href="/signup" className="block mt-3">
          You don&apos;t have an account? Sign up here
        </Link>

        <Input
          type="submit"
          value="Login"
          color="primary"
          variant="flat"
          className="block mt-3"
        />
      </form>
    </div>
  );
};

export default Login;
