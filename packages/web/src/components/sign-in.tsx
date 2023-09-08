'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const SignIn = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('http://localhost:4000/api/v1/sessions', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="rounded-sm border border-zinc-700 bg-white p-10">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="rounded-sm border border-zinc-500 px-1 py-1"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="rounded-sm border border-zinc-500 px-1 py-1"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="bg-black py-2 text-white">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default SignIn;
