'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateUser() {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ Name: name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      setMessage('Created successfully!');
       setTimeout(() => {
    router.push('/users');
  }, 1000);                        
    } else {
        setMessage(data.message || 'Signup failed');
    }
  };

 return (
    <div
  className="min-h-screen flex items-center justify-center bg-emerald-800"

>
   <div className="bg-gray-700 p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-4xl font-bold mb-6 text-center text-white">Create</h2>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md text-gray-900"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
           required
          className="w-full px-4 py-2 border rounded-md text-gray-900"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
           required
          className="w-full px-4 py-2 border rounded-md text-gray-900"
        />
        <button type="submit"
         className="w-full bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-md transition"
        >
         CREATE
        </button>
      </form>
      <p>{message}</p>
    </div>
    </div>
  );
}