'use client';
export default function ChatButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="fixed bottom-6 right-6 bg-blue-600 font-extrabold text-2xl text-white p-4 px-8 rounded-xl shadow-lg"
      onClick={onClick}
    >
      Chat
    </button>
  );
}
