'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState({ Name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch user');

        const data = await res.json();
        setUser({ Name: data.Name, email: data.email });
      } catch (err) {
        setError('Error loading user data');
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Token not found');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/user/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Update failed');
      }
    setTimeout(() => {
    router.push('/users');
  }, 1000); 

    } catch (err) {
      setError(err.message || 'Error updating user');
    }
  };

  return (
  
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
         <div className="w-full max-w-md bg-gray-400 p-8 rounded shadow">
     <h2 className="text-4xl font-bold mb-6 text-center text-blue-500">UPDATE USER</h2>
     
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-800">Name</label>
          <input
            name="Name"
            value={user.Name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-gray-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-800">Email</label>
    
          <input
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-gray-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-950 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
      </div>
  );
}
