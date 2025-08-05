'use client';

export default function CreateUserModal({ user, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Create New User</h3>
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="Name"
          value={user.Name}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={user.email}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          value={user.password}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div className="flex justify-between mt-4">
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Create</button>
        <button type="button" onClick={onCancel} className="text-gray-600 px-4 py-2">Cancel</button>
      </div>
    </form>
  );
}
