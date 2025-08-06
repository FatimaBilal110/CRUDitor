'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function EditUserModal({ user, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      Name: user?.Name || '',
      email: user?.email || '',
      password: '', 
    },
  });

  useEffect(() => {
    reset({
      Name: user?.Name || '',
      email: user?.email || '',
      password: '',
    });
  }, [user, reset]);

  const image = watch('image');

  const customSubmit = (data) => {
    const finalData = {
      ...data,
      image: data.image?.[0] || null, 
    };
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleSubmit(customSubmit)} className="space-y-4">
      <h3 className="text-xl font-semibold">Edit User</h3>

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
        <label className="block text-sm font-medium">Update Image</label>
        <input
          type="file"
          accept="image/*"
          {...register('image')}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
        >
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="text-gray-600 px-4 py-2">
          Cancel
        </button>
      </div>
    </form>
  );
}
