'use client';
import { useState } from 'react';
import { useNotesStore } from '@/store/notesStore';
import { getGeminiResponse } from '@/utils/geminiClient'; // updated import

export default function ChatWindow() {
  const { notes, activeNoteId, sendMessage } = useNotesStore();
  const [input, setInput] = useState('');
  const note = notes.find((n) => n.id === activeNoteId);

  const handleSend = async () => {
    if (!input.trim() || !note) return;

    sendMessage(note.id, { sender: 'user', message: input });

    try {
      const aiReply = await getGeminiResponse(input);
      sendMessage(note.id, { sender: 'ai', message: aiReply });
    } catch {
      sendMessage(note.id, { sender: 'ai', message: 'Something went wrong.' });
    }

    setInput('');
  };

  if (!note) return null;

  return (
    <div className="bg-gray-50 border-t p-4 space-y-2 mt-4 max-h-64 overflow-y-auto rounded">
      <div className="space-y-2">
        {note.chat.map((msg, i) => (
          <div
            key={i}
            className={`max-w-sm p-2 rounded ${
              msg.sender === 'user'
                ? 'ml-auto bg-blue-700 text-right text-white'
                : 'bg-gray-700 text-white'
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          className="flex-1 border p-2 text-black rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key=== 'Enter'){
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask something..."
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded-xl">
          Send
        </button>
      </div>
    </div>
  );
}
