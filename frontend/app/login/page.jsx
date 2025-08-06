'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token);
        router.push('/users');
      } else {
        setMessage(result.message || 'Invalid email or password');
        setTimeout(() => router.push('/signup'), 1000);
      }
    } catch (error) {
      setMessage('Something went wrong.');
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bgi.jpg')" }}
    >
      <div className="bg-white/50 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-2 border rounded-md text-gray-900"
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
            className="w-full px-4 py-2 border rounded-md text-gray-900"
          />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
