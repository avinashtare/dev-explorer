import { useState } from "react";
import NoteContext from "./noteContext";

function getCurrentTime() {
  const now = new Date();

  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Note: Months are zero-based
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? " PM" : " AM";

  // Convert hours to 12-hour format
  const formattedHours = hours % 12 || 12;

  const formattedTime = `${day}-${month}-${year} ${formattedHours}:${minutes}${ampm}`;

  return formattedTime;
}

function getLocalData() {
  let data = localStorage.getItem("data");
  if (data == null) {
    localStorage.setItem("data", "[]");
    data = localStorage.getItem("data");
  }
  return data;
}

function updateLocalData(notes) {
  let notesData = JSON.stringify(notes);
  localStorage.setItem("data", notesData);
}
const NoteState = (props) => {
  const localData = JSON.parse(getLocalData());
  const [Notes, setNotes] = useState(localData);

  function addNote(id, note) {
    const currentTime = getCurrentTime();
    let addNotesValue = [
      ...Notes,
      { id, note, check: false, time: currentTime },
    ];
    setNotes(addNotesValue);

    // for localstorage
    updateLocalData(addNotesValue);
  }

  function updateNote(id, updatedNote, updatedCheck) {
    // Use find instead of filter to get the first matching note
    const findNote = Notes.find((note) => note.id === id);

    if (findNote) {
      // Update the properties of the found note
      findNote.note = updatedNote;
      findNote.check = updatedCheck;

      // Create a new array with the updated note and other notes
      const updatedNotes = Notes.map((note) =>
        note.id === id ? findNote : note
      );

      // Update the state with the new array
      setNotes(updatedNotes);
      // for localstorage
      updateLocalData(updatedNotes);
    }
  }

  // delete notes
  function removeNote(id) {
    const updatedNotes = Notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);

    // for localstorage
    updateLocalData(updatedNotes);
  }

  return (
    <NoteContext.Provider value={{ Notes, addNote, removeNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
