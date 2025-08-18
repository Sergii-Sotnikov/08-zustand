
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
    description: `Browse ${slug[0]} notes in NoteHub. Create, edit and search your ${slug[0]} notes with a clean, fast interface.`,
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



