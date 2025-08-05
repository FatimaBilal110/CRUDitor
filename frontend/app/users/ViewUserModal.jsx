'use client';

export default function ViewUserModal({ user, onEdit, onDelete }) {
    
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold">User Details</h3>
      <p><strong>ID:</strong> {user._id}</p>
      <p><strong>Name:</strong> {user.Name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="mt-6 flex justify-center gap-6">
        <button onClick={onEdit} title="Edit">
          <img src="/edit.png" alt="Edit" className="h-9 w-9" />
        </button>
        <button onClick={onDelete} title="Delete">
          <img src="/delete.png" alt="Delete" className="h-12 w-12" />
        </button>
      </div>
    </div>
  );
}
