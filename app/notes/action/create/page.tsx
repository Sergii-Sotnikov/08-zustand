import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"
import type { Metadata } from "next";


export const metadata:Metadata = {
  title: "NoteHub: Create note",
  description: "Create a new note: add a title, text, and a tag. NoteHub’s handy form makes it easy to capture ideas quickly and organize them by category.",
      openGraph: {
      title: `NoteHub: Create note`,
      description: `Create a new note: add a title, text, and a tag. NoteHub’s handy form makes it easy to capture ideas quickly and organize them by category.`,
      url: `https://08-zustand-eta-five.vercel.app/notes/action/create`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub`,
        },
      ],
      type: 'website',
    },
}

export default async function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
