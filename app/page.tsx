'use client';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import ChatWindow from './components/ChatWindow';
import ChatButton from './components/ChatButton';
import { useState } from 'react';

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 relative">
        <Editor />
        {showChat && <ChatWindow />}
        <ChatButton onClick={() => setShowChat((prev) => !prev)} />
      </main>
    </div>
  );
}
