'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [ModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

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

  const handleCreateClick = () => {
    router.push('/users/create');
  };

  const handleViewClick = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error('Failed to fetch user details');
        return;
      }

      const data = await res.json();
      setSelectedUser(data);
      setModalOpen(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };
 
const handleEdit = (userId) => {
  const token = localStorage.getItem('token');

  if (!token) {
    setError('No token found. Please log in.');
    return;
  }
  router.push(`/users/edit/${userId}`);
};

const handleDelete = (userId) => {
  const token = localStorage.getItem('token');

  if (!token) {
    setError('No token found. Please log in.');
    return;
  }
  router.push(`/users/delete/${userId}`);
};

  return (
    <div className="min-h-screen w-full p-6 bg-cover bg-center" 
    style={{ backgroundImage: "url('/userbg.jpeg')" }}>

      {/* Main Heading-list of users */}
      <h2 className="text-4xl font-bold mb-6 text-center text-green-950">User List</h2>
      <div className='flex justify-end px-4'>

         {/* create button */}
        <button
          onClick={handleCreateClick}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          +Create User
        </button>
      </div>

      {error && <p className="text-red-600 text-center mt-4">{error}</p>}

      <div className="mt-6 overflow-x-auto">
        <table className="table-auto min-w-full bg-white rounded-md shadow-md">
          <thead className="bg-green-700 text-white">
            <tr>
              <th className="px-6 text-left py-3">ID</th>
              <th className="px-6 text-left py-3">Name</th>
              <th className="px-6 text-left py-3">Email</th>
              <th className="px-6 text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{user._id}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.Name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                <td className="px-6 py-4">

                   {/* view button */}
                  <button
                    onClick={() => handleViewClick(user._id)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
                 {/* MODAL-user detail by id */}
      {ModalOpen && selectedUser && (
        <div className="fixed top-0 right-0 rounded-2xl h-full bg-white p-6 text-black">
          <div className="flex justify-between mb-6">
            <h3 className="text-xl font-semibold">User Details</h3>
            <button onClick={() => setModalOpen(false)} className="text-red-600 text-lg font-bold">✕</button>
          </div>
          <div className="space-y-3">
            <p><strong>ID:</strong> {selectedUser._id}</p>
            <p><strong>Name:</strong> {selectedUser.Name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
          </div>
          <div className="mt-6 flex justify-center gap-6">

          {/* edit button */}
  <button
    onClick={() => handleEdit(selectedUser._id)}
    className='hover:opacity-5'
    title='Edit-User' >
     <img src="/edit.png" alt="Edit" className="h-9 w-9" />
  </button>

           {/* delete button */}
  <button
    onClick={() => handleDelete(selectedUser._id)}
    className="hover:opacity-5"
    title='Delete-User'
  >
    <img src="/delete.png" className="h-12 w-12"/>
  </button>
</div>

        </div>
      )}
    </div>
  );
}
