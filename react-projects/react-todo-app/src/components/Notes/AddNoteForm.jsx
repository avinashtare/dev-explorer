import React, { useContext, useRef, useState } from "react";
import NoteContext from "../../store/noteContext";
import { toast } from "react-toastify";

function AddNoteForm() {
  let NotesState = useContext(NoteContext);
  const addDataInput = useRef(null);

  const [NoteValue, setNoteValue] = useState(
    NotesState.Notes.length === 0 ? "Go To dinner" : null
  );
  const handleInput = (e) => {
    setNoteValue(e.target.value);
  };
  const handleAddNote = (e) => {
    e.preventDefault();
    NotesState.addNote(Math.random(), NoteValue);
    setNoteValue("");
    addDataInput.current.focus();

    // toastify 
    toast.success('Note Added', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
  };

  return (
    <div>
      <h1 className="text-3xl mt-2">Add Note</h1>
      {/* form  */}
      <form>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Add Your Note
          </label>
          <input
            type="text"
            value={NoteValue}
            onChange={handleInput}
            ref={addDataInput}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add Somthing That You Will be Forgot..."
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleAddNote}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddNoteForm;
