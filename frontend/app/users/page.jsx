'use client';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/user/list', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          setError('Unauthorized or token expired');
          return;
        }

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.Name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}
