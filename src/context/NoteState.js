import React, { useContext } from 'react'
import { useState } from 'react'
import NoteContext from './NoteContext'
import { toast } from 'react-toastify';
const NoteState = (props) => {

  const host = "http://localhost:5000/"
  const notesarr = []
  const [notes, setNotes] = useState(notesarr)
  
  const getAllNotes = async () => {
    const fetchnote = host + "api/v1/notes/fetchallnotes"
    const token = localStorage.getItem('token');
    const response = await fetch(fetchnote, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    const userNotes = await response.json();
    setNotes(userNotes);
  }
  //Add Note
  const addNote = async (title, description, tag, e) => {

    const addNoteUrl = host + "api/v1/notes/addnote"
    const token = localStorage.getItem('token');
    const response = await fetch(addNoteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({ "title": title, "description": description, "tag": tag })
    });
    const note = await response.json();
    if (note.success) {
      toast.success("Note added Successfully..", { autoClose: 2000 });
      const newNote = notes.concat(note.savedNote);
      setNotes(newNote);
    }
    else {
      toast.error("Some Error Occured",{ autoClose: 1000 })
    }
  }

  //Delete Note
  const deleteNote = async (id) => {
    const deleteNoteUrl = host + "api/v1/notes/deletenote/" + id
    const token = localStorage.getItem('token');
    const response = await fetch(deleteNoteUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
    });
    const deletedNote = await response.json();
    if (deletedNote.success) {
      toast.success("Note Deleted Successfully..", { autoClose: 1000 });
      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes);
    }
    else {
      toast.error("Some Error Occured",{ autoClose: 1000 })
    }

  }

  //Edit Note
  const editNote = async (id, title, description, tag) => {

    const editNoteUrl = host + "api/v1/notes/updatenote/" + id;
    const token = localStorage.getItem('token');
    const response = await fetch(editNoteUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": token
      },
      body: JSON.stringify({ "title": title, "description": description, "tag": tag })
    });

    const json = await response.json();

    if (json.success) {
      const newNotes = JSON.parse(JSON.stringify(notes));
      toast.success("Note Edited Successfully..", { autoClose: 1000 });
      for (let i = 0; i < newNotes.length; i++) {
        const item = newNotes[i];
        if (id == item._id) {
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    }
    else {
      toast.error("Some Error Occured",{ autoClose: 1000 })
    }
   

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;
