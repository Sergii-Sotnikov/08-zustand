import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props):Promise<Metadata>=>{
const {id} = await params;
const data = await fetchNoteById(id);

return {
  title: data.title,
  description: data.content.slice(0, 25),
      openGraph: {
      title: `NoteHub: ${data.title}`,
      description: `${data.content.slice(0, 25)}`,
      url: `https://08-zustand-eta-five.vercel.app/notes/${id}`,
      siteName: `NoteHub: ${data.title}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `${data.title}`,
        },
      ],
      type: 'website',
    },
}
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey:['note', id],
    queryFn: ()=> fetchNoteById(id),
  })


  return(
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
      </HydrationBoundary>
  )
  

};

export default NoteDetails;
