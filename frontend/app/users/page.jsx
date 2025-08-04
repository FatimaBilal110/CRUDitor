'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); 
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

  const openModal = async (userId, type) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await fetch(`http://localhost:5000/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Failed to fetch user details');

    const data = await res.json();
    setSelectedUser(data);
    setModalType(type);
    setModalOpen(true);
  } catch (err) {
    console.error(err);
  }
};

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setSelectedUser(prev => ({ ...prev, [name]: value }));
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`http://localhost:5000/user/update/${selectedUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(selectedUser),
    });

    if (!res.ok) throw new Error('Update failed');
    setModalType('view');
  } catch (err) {
    console.error('Error updating user:', err);
  }
};

const handleDeleteConfirm = async () => {
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`http://localhost:5000/user/delete/${selectedUser._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Delete failed');

    closeModal();
  } 
  catch (err) {
  console.error('Error deleting user:', err);
  }
};

const closeModal = () => {
  setModalOpen(false);
  setModalType('view');
  setSelectedUser(null);
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
                  onClick={() => openModal(user._id, 'view')}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
>                  View
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
      <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-red-600 text-lg font-bold">✕</button>

      {modalType === 'view' && (
        <div className='space-y-3'>
            <h3 className="text-xl font-semibold">User Details</h3>
        <div className="space-y-3">
          <p><strong>ID:</strong> {selectedUser._id}</p>
          <p><strong>Name:</strong> {selectedUser.Name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>

          <div className="mt-6 flex justify-center gap-6">
            <button onClick={() => setModalType('edit')} title="Edit">
              <img src="/edit.png" alt="Edit" className="h-9 w-9" />
            </button>
            <button onClick={() => setModalType('delete')} title="Delete">
              <img src="/delete.png" alt="Delete" className="h-12 w-12" />
            </button>
          </div>
        </div>
        </div>
      )}

      {modalType === 'edit' && (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="Name"
              value={selectedUser.Name}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={selectedUser.email}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Save
            </button>
            <button type="button" onClick={() => setModalType('view')} className="text-gray-600 px-4 py-2">
              Cancel
            </button>
          </div>
        </form>
      )}

      {modalType === 'delete' && (
        <div className="space-y-1">
          <div className='py-7'>
          <p>Are you sure you want to delete <strong>{selectedUser.Name}</strong>?</p>
          </div>
          <div className="flex justify-between">
            <button onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
              Confirm Delete
            </button>
            <button onClick={() => setModalType('view')} className="text-gray-600 px-4 py-2">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
      )}
    </div>
  );
}
