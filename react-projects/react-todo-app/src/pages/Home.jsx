import React, { useContext } from "react";
import NoteContext from "../store/noteContext";
import Note from "../components/Notes/Note";
import AddNoteForm from "../components/Notes/AddNoteForm";

export default function Home() {
  let NotesState = useContext(NoteContext);

  return (
    <div>
      <div className="relative overflow-x-auto container align-middl mx-auto">
        {/* add note form  */}
        <AddNoteForm></AddNoteForm>

        {/* show notes  */}
        <h1 className="text-3xl my-2 ">My Note</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-5">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Note
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Completed
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {NotesState.Notes.map((e) => {
              return <Note key={e.id} data={e} />;
            })}
            {NotesState.Notes.length === 0?<h1 className="text-2xl my-2 ">Please add a note..</h1>:null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
