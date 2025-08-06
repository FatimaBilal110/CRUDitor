'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import UserItem from './UserItem';
import Modal from './Modal';
import ViewUserModal from './ViewUserModal';
import EditUserModal from './EditUserModal';
import CreateUserModal from './CreateUserModal';
import DeleteUserModal from './DeleteUserModal';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); 
  const [ModalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5; 


    const fetchUsers = async (page = 1) => {
  const token = localStorage.getItem('token');
  if (!token) {
    setError('No token found. Please log in.');
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/user/list?page=${page}&limit=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      setError('Unauthorized or token expired');
      return;
    }

    const data = await res.json();
    setUsers(data.users);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);
  } catch (err) {
    setError('Failed to fetch users');
  }
};
  useEffect(() => {
  fetchUsers(currentPage);
}, [currentPage]);



  const openModal = async (userId, type) => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await fetch(`http://localhost:5000/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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

const handleSubmit = async (formDataFromModal) => {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('Name', formDataFromModal.Name);
  formData.append('email', formDataFromModal.email);
  formData.append('password', formDataFromModal.password);
  formData.append('image', formDataFromModal.image);

  try {
    const response = await fetch('http://localhost:5000/user/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      closeModal();
      fetchUsers(1); // refresh
    } else {
      setError(data.message || 'Signup failed');
    }
  } catch (err) {
    console.error('Error creating user:', err);
    setError('Failed to create user');
  }
};

const handleEditSubmit = async (formDataFromModal) => {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('Name', formDataFromModal.Name);
  formData.append('email', formDataFromModal.email);
  if (formDataFromModal.password) {
    formData.append('password', formDataFromModal.password);
  }
  if (formDataFromModal.image instanceof File) {
    formData.append('image', formDataFromModal.image);
  }

  try {
    const res = await fetch(`http://localhost:5000/user/update/${selectedUser._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error('Update failed');

    const updated = await res.json();
              await fetchUsers(1);

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

    setUsers(prev => prev.filter(user => user._id !== selectedUser._id));

    closeModal();
      const updatedPage = currentPage;
    await fetchUsers(updatedPage);

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
    <div className="min-h-screen w-full p-6 bg-cover bg-center" style={{ backgroundImage: "url('/userbg.jpeg')" }}>
      <h2 className="text-4xl font-bold mb-6 text-center text-green-950">User List</h2>

      <div className='flex justify-end px-4'>
        <button
          onClick={() => {
            setModalType('create');
            setSelectedUser({ Name: '', email: '', password: '', image:'' });
            setModalOpen(true);
          }}
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
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserItem key={user._id} user={user} onView={() => openModal(user._id, 'view')} />
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4 space-x-4">

  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="text-green-900 font-semibold pt-2">Page {currentPage} of {totalPages}</span>

  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
</div>
    

      {ModalOpen && (
        <Modal onClose={closeModal}>
          {modalType === 'view' && (
            <ViewUserModal user={selectedUser} onEdit={() => setModalType('edit')} onDelete={() => setModalType('delete')} />
          )}
          {modalType === 'edit' && (
            <EditUserModal user={selectedUser} onChange={handleInputChange} onSubmit={handleEditSubmit} onCancel={() => setModalType('view')} />
          )}
          {modalType === 'create' && (
            <CreateUserModal user={selectedUser} onChange={handleInputChange} onSubmit={handleSubmit} onCancel={closeModal} />
          )}
          {modalType === 'delete' && (
            <DeleteUserModal user={selectedUser} onDelete={handleDeleteConfirm} onCancel={() => setModalType('view')} />
          )}
        </Modal>
      )}
    </div>
  );
}
