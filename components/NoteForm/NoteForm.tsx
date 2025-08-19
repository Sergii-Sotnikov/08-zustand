"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import type { NewNote } from "@/types/note";
import { postNote } from "@/lib/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
    const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: postNote,
    onSuccess: () => {
      toast.success("Note added");
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

  //   const queryClient = useQueryClient()

  //  const mutation = useMutation({
  //   mutationFn: (newNote: NewNote) => postNote(newNote),
  //   onSuccess: () => {
  //     toast.success("Note added");
  //     queryClient.invalidateQueries({ queryKey: ["notes"] });
  //   },
  //   onError(){
  //     toast.error("Failed to create note");
  //   }
  // });

  //   const handleCloseModal = () => {

  //   };

  // const handleSubmit = (
  //   values: FormValues,
  //   formikHelpers: FormikHelpers<FormValues>
  // ) => {
  //   mutation.mutate(values, {
  //     onSettled: () => formikHelpers.resetForm(),
  //   });
  // };

  //   const initialFormValues: FormValues = {
  //     title: "",
  //     content: "",
  //     tag: "Todo",
  //   };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input name="title" id="title" type="text" className={css.input} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows={8}
          className={css.textarea}
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label>Tag</label>
        <select name="tag" id="tag" className={css.select}>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div className={css.actions}>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create
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

    // <Formik
    //   initialValues={initialFormValues}
    //   onSubmit={handleSubmit}
    //   validationSchema={OrderSchema}
    // >
    //   <Form className={css.form}>
    //     <div className={css.formGroup}>
    //       <label htmlFor="title">Title</label>
    //       <Field id="title" type="text" name="title" className={css.input} />
    //       <ErrorMessage name="title" component="span" className={css.error} />
    //     </div>

    //     <div className={css.formGroup}>
    //       <label htmlFor="content">Content</label>
    //       <Field
    //         as="textarea"
    //         id="content"
    //         name="content"
    //         rows={8}
    //         className={css.textarea}
    //       />
    //       <ErrorMessage name="content" component="span" className={css.error} />
    //     </div>

    //     <div className={css.formGroup}>
    //       <label htmlFor="tag">Tag</label>
    //       <Field as="select" id="tag" name="tag" className={css.select}>
    //         <option value="Todo">Todo</option>
    //         <option value="Work">Work</option>
    //         <option value="Personal">Personal</option>
    //         <option value="Meeting">Meeting</option>
    //         <option value="Shopping">Shopping</option>
    //       </Field>
    //       <ErrorMessage name="tag" component="span" className={css.error} />
    //     </div>

    //     <div className={css.actions}>
    //       <button
    //         type="button"
    //         className={css.cancelButton}
    //         onClick={handleCloseModal}
    //       >
    //         Cancel
    //       </button>
    //       <button type="submit" className={css.submitButton} disabled={false}>
    //         Create note
    //       </button>
    //     </div>
    //   </Form>
    // </Formik>
  );
}
