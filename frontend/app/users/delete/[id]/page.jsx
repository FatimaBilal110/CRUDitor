'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function DeleteUserPage() {
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

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Token not found');
      return;
    }

    const confirmed = confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/user/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Deletion failed');
      }

      setTimeout(() => {
        router.push('/users');
      }, 1000);
    } catch (err) {
      setError(err.message || 'Error deleting user');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-900">
      <div className="w-full max-w-md bg-gray-200 p-8 rounded shadow">
        <h2 className="text-4xl font-bold mb-6 text-center text-red-600">Delete User</h2>

        {error && <p className="text-red-700 mb-4">{error}</p>}

        <div className="mb-6 text-gray-900" >
          <p><strong>Name:</strong> {user.Name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded w-full"
        >
          Delete User
        </button>
      </div>
    </div>
  );
}
