'use client';

export default function UserItem({ user, onView }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4 text-sm text-gray-800">{user._id}</td>
      <td className="px-6 py-4 text-sm text-gray-800">{user.Name}</td>
      <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
      <td className="px-6 py-4">
        <button
          onClick={onView}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          View
        </button>
      </td>
    </tr>
  );
}
