
import {fetchNotes} from "@/lib/api"
import NotesClients from "./Notes.client";
import type { Metadata } from "next";


type Props = {
  params: Promise<{slug: string[]}>;
}

export const generateMetadata = async ({params}:Props): Promise<Metadata> =>{
  const {slug} = await params
  console.log(slug[0])
  return {
    title: `NoteHub: ${slug[0]}`,
    description: `Organize your ${slug[0].toLowerCase()} notes with NoteHub. Write, edit, and filter ${slug[0].toLowerCase()} content fast in a simple, focused interface.`,
    openGraph: {
      title: `NoteHub: ${slug[0]}`,
      description: `Organize your ${slug[0].toLowerCase()} notes with NoteHub. Write, edit, and filter ${slug[0].toLowerCase()} content fast in a simple, focused interface.`,
      url: `https://08-zustand-eta-five.vercel.app/notes/filter/${slug[0]}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${slug[0]}`,
        },
      ],
      type: 'website',
    },
  }
}

export default async function Notes({params}:Props){
  const {slug} = await params

  const initialTag = slug[0] === 'All' ? '' : slug[0];

    const initialData = await fetchNotes("", 1, initialTag);

  return (
    <>
    <NotesClients initialData={initialData} initialTag={initialTag}/>
    </>)   
}



