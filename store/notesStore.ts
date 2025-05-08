import { create } from 'zustand';

export interface ChatMessage {
  sender: 'user' | 'ai';
  message: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  chat: ChatMessage[];
}

interface NotesState {
  notes: Note[];
  activeNoteId: string | null;
  addNote: () => void;
  setActiveNote: (id: string) => void;
  updateNoteContent: (id: string, content: string) => void;
  sendMessage: (id: string, msg: ChatMessage) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  activeNoteId: null,
  addNote: () => {
    const id = Date.now().toString();
    const newNote: Note = {
      id,
      title: `Note ${id.slice(-4)}`,
      content: '',
      chat: [],
    };
    set((state) => ({
      notes: [...state.notes, newNote],
      activeNoteId: id,
    }));
  },
  setActiveNote: (id) => set(() => ({ activeNoteId: id })),
  updateNoteContent: (id, content) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, content } : note
      ),
    })),
  sendMessage: (id, msg) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, chat: [...note.chat, msg] } : note
      ),
    })),
}));
