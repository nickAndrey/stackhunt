type PatientNoteEdit = {
  edited_by: string;
  editor_name: string;
  content_before: string;
  edited_at: string;
};

export type Note = {
  id: string;
  author_id: string;
  author_name: string;
  content: string;
  created_at: string;
  updated_at?: string;
  updated_by?: string;
  updated_by_name?: string;
  edit_history?: PatientNoteEdit[];
};
