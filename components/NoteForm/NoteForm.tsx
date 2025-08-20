"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import type { NewNote } from "@/types/note";
import { postNote } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNoteDraft } from "@/lib/store/noteStore";
import type { ChangeEvent } from "react";

const OrderSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Too Long!")
    .required("Title is required"),
  content: Yup.string().max(500, "Too Long!"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
    .required("Tag is required"),
});

export default function NoteForm() {
  const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  const { draft, setDraft, clearDraft } = useNoteDraft();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: postNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note added");
      clearDraft();
      router.back();
    },
    onError() {
      toast.error("Failed to create note");
    },
  });

  const handleCancel = () => router.back();

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNote;
    mutate(values);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({
      ...(draft as NewNote),
      [e.target.name as keyof NewNote]: e.target.value,
    });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          className={css.input}
          onChange={handleChange}
          defaultValue={draft.title}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows={8}
          className={css.textarea}
          onChange={handleChange}
          defaultValue={draft.content}
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label>Tag</label>
        <select
          name="tag"
          id="tag"
          className={css.select}
          onChange={handleChange}
          defaultValue={draft.tag}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating" : "Create"}
        </button>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
