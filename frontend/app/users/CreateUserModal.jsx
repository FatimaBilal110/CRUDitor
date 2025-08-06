'use client';

import { useForm } from 'react-hook-form';

export default function CreateUserModal({ onSubmit, onCancel }) {
  const { register, handleSubmit, setValue, watch } = useForm();

  const image = watch('image');

  const customSubmit = (data) => {
    onSubmit({
      ...data,
      image: data.image[0]  
    });
  };

  return (
    <form onSubmit={handleSubmit(customSubmit)} className="space-y-4">
      <h3 className="text-xl font-semibold">Create New User</h3>

      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          {...register('Name', { required: true })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          {...register('email', { required: true })}
          type="email"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          {...register('password', { required: true })}
          type="password"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          {...register('image', { required: true })}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Create
        </button>
        <button type="button" onClick={onCancel} className="text-gray-600 px-4 py-2">
          Cancel
        </button>
      </div>
    </form>
  );
}
