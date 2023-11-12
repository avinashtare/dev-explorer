import React, { useContext, useState, useRef } from "react";
import NoteContext from "../../store/noteContext";
import { toast } from "react-toastify";

function Note({ data }) {
  let { id, note, time } = data;

  const updateNoteInput = useRef(null);
  const editBtn = useRef(null);
  const [Editable, setEditable] = useState(false);

  let NotesState = useContext(NoteContext);

  const [check, setCheck] = useState(data.check);

  // Toggle the checkbox state
  const handleCheckboxChange = () => {
    setCheck(!check);
    
    // update value
    NotesState.updateNote(id, NoteValue, !check);

    toast.warning("Note Updated...", {
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

  const handleCheckDeleteBtn = () => {
    NotesState.removeNote(id);
    // toastify
    toast.error("Note Deleted...", {
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

  const handleEditBtn = () => {
    if (!Editable) {
      setEditable(true);
      editBtn.current.innerText = "Done";

      if (updateNoteInput.current) {
        updateNoteInput.current.focus();
      }
    } else {
      updateNote();
    }
  };

  const [NoteValue, setNoteValue] = useState(note);

  const handleInput = (e) => {
    setNoteValue(e.target.value);
  };

  function updateNote() {
    if (Editable) {
      setEditable(false);
      editBtn.current.innerText = "Edit";
      NotesState.updateNote(id, NoteValue, check);

      toast.warning("Note Updated...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <td className="px-6 py-4 w-1/2">
        {Editable ? (
          <input
            type="text"
            value={NoteValue}
            onChange={handleInput}
            ref={updateNoteInput}
            onBlur={updateNote}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add Somthing That You Will be Forgot..."
          />
        ) : (
          <span
            className={`font-mono ${
              check ? "text-decoration-line: line-through" : null
            }`}
          >
            {note}
          </span>
        )}
      </td>
      <td className="px-6 py-4 w-1/6">{time}</td>
      <td className="px-6 py-4 w-1/6 ">
        <input
          id="checked-checkbox"
          type="checkbox"
          checked={check}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </td>
      <td className="px-6 py-4 w-1/4">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleEditBtn}
          ref={editBtn}
        >
          Edit
        </button>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={handleCheckDeleteBtn}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Note;
