'use client';

export default function DeleteUserModal({ user, onDelete, onCancel }) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-red-700">Confirm Deletion</h3>
      <p>Are you sure you want to delete <strong>{user.Name}</strong>?</p>
      <div className="flex justify-between">
        <button onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Confirm Delete</button>
        <button onClick={onCancel} className="text-gray-600 px-4 py-2">Cancel</button>
      </div>
    </div>
  );
}
