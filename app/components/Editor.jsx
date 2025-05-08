'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ListItem from '@tiptap/extension-list-item';


import { useNotesStore } from '@/store/notesStore';
import { useEffect } from 'react';
import clsx from 'classnames';

export default function Editor() {
  const { notes, activeNoteId, updateNoteContent } = useNotesStore();
  const note = notes.find((n) => n.id === activeNoteId);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Underline,
      Strike,
      HorizontalRule,
    ],
    content: note?.content || '',
    onUpdate: ({ editor }) => {
      if (note) updateNoteContent(note.id, editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-full focus:outline-none',
      },
    },
    immediatelyRender: false,
  });



  useEffect(() => {
    if (editor && note) editor.commands.setContent(note.content || '');
  }, [note?.id]);

  if (!note) return <div className="font-extrabold text-3xl">Select or create a note.</div>;

  return (
    <div>
      {/* Inline toolbar */}
      {editor && (
        <div className="flex flex-wrap gap-2 mb-4 bg-gray-700 p-2 rounded text-sm">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={clsx("px-2 py-1 rounded", { 'bg-blue-500': editor.isActive('bold') })}
          >Bold</button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={clsx("px-2 py-1 rounded", { 'bg-blue-500': editor.isActive('italic') })}
          >Italic</button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={clsx("px-2 py-1 rounded", { 'bg-blue-500': editor.isActive('underline') })}
          >Underline</button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={clsx("px-2 py-1 rounded", { 'bg-blue-500': editor.isActive('strike') })}
          >Strike</button>

          <button
            onClick={() => {
              console.log("Heading command triggered");
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }} className={clsx("px-2 py-1 rounded", { 'bg-blue-500': editor.isActive('heading', { level: 1 }) })}
          >H1</button>

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={clsx("px-2 py-1 rounded", { 'bg-blue-500': editor.isActive('heading', { level: 2 }) })}
          >H2</button>

          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={clsx("px-2 py-1 rounded", { 'bg-blue-500': editor.isActive('heading', { level: 3 }) })}
          >H3</button>

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={clsx("px-2 py-1 rounded", { 'bg-blue-500': editor.isActive('bulletList') })}
          >Bullet</button>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={clsx("px-2 py-1 rounded", { 'bg-blue-500': editor.isActive('orderedList') })}
          >Numbered</button>




          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="px-2 py-1 rounded bg-gray-300"
          >HR</button>
        </div>
      )}

      {/* Editor content */}
      <div className="border p-4 rounded min-h-[300px] bg-white text-black  shadow">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
