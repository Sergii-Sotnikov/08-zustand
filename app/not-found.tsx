import css from "./Home.module.css"
import type { Metadata } from "next";


export const metadata:Metadata = {
  title: "NoteHub: 404 - Page not found",
  description: "Sorry, the page you are looking for does not exist.",
      openGraph: {
      title: `NoteHub: not found page`,
      description: `Sorry, the page you are looking for does not exist.`,
      url: `https://08-zustand-eta-five.vercel.app/`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `NoteHub: 404 - Page not found`,
        },
      ],
      type: 'website',
    },
}

const NotFound = () => {
  return (
    <div>
<h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;