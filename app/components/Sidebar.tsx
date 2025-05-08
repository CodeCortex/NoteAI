'use client';
import { useNotesStore } from '@/store/notesStore';

export default function Sidebar() {
  const { notes, activeNoteId, addNote, setActiveNote } = useNotesStore();

  return (
    <aside className="w-64 bg-gray-400 p-4 h-screen overflow-y-auto">
      <button className="w-full mb-4 bg-blue-600 text-white py-2 rounded" onClick={addNote}>
        + New Note
      </button>
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => setActiveNote(note.id)}
          className={`p-2 rounded cursor-pointer text-white text-xl border-2 mb-2 ${
            note.id === activeNoteId ? 'bg-blue-600' : 'hover:bg-gray-600'
          }`}
        >
          {note.title}
        </div>
      ))}
    </aside>
  );
}
