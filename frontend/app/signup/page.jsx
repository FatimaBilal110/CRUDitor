'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [message, setMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.Name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Signup successful!');
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } else {
        setMessage(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images.png')" }}
    >
      <div className="bg-white/30 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">Signup</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register('Name', { required: 'Name is required' })}
            className="w-full px-4 py-2 border rounded-md text-gray-900"
          />
          {errors.Name && <p className="text-red-600">{errors.Name.message}</p>}

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
            Sign Up
          </button>
        </form>

        {message && <p className="mt-4 text-white text-center">{message}</p>}
      </div>
    </div>
  );
}
