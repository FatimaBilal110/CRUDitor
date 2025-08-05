'use client';

export default function Modal({ onClose, children }) {
  return (
    <div className="fixed top-0 right-0 rounded-2xl h-full w-[400px] bg-white p-6 text-black shadow-lg z-50 overflow-auto">
      <button onClick={onClose} className="absolute top-4 right-4 text-red-600 text-lg font-bold">✕</button>
      {children}
    </div>
  );
}
