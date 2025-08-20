import { create } from "zustand";
import type { NewNote } from "@/types/note";
import { persist } from "zustand/middleware";

const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteDraft = {
  draft: NewNote;
  setDraft: (newData: NewNote) => void;
  clearDraft: () => void;
};

export const useNoteDraft = create<NoteDraft>()(
  persist((set) => {
    return {
      draft: initialDraft,
      setDraft: (newData: NewNote) => set({ draft: newData }),
      clearDraft: () => set({ draft: initialDraft }),
    };
  }, {
    name: 'draft',
  })
);
