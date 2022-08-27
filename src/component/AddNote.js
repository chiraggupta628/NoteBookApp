import React from 'react'
import NoteContext from '../context/NoteContext'
import { useState , useContext} from 'react'

export const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;

    const [notes, setnotes] = useState({"noteTitle":"","noteDescription":"","noteTag":""})
    const handleAddNote = (e)=>{
        e.preventDefault();
        addNote(notes.noteTitle,notes.noteDescription,notes.noteTag,e);
        setnotes({"noteTitle":"","noteDescription":"","noteTag":""});
    }
    const onChange = (e)=>{
        setnotes({...notes,[e.target.name]:e.target.value});
    }
  return (
    <>
    <div className="container">
                <p className="h1 my-3 text-center">Add Note</p>
                <form>
                    <div className="form-group my-3">
                        <label htmlFor="formGroupExampleInput">Title :-</label>
                        <input type="text" className="form-control" id="noteTitle" name="noteTitle" value={notes.noteTitle} onChange={onChange}/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="formGroupExampleInput2">Tag :-</label>
                        <input type="text" className="form-control" id="noteTag" name="noteTag" value={notes.noteTag} onChange={onChange}/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="exampleFormControlTextarea1">Description :- </label>
                        <textarea className="form-control" id="noteDescription" name="noteDescription" value={notes.noteDescription} onChange={onChange} rows="3"></textarea>
                    </div>
                    <button type="submit" disabled={notes.noteTitle.length < 3 || notes.noteDescription.length <5}  className="btn btn-primary btn-block" onClick={handleAddNote}>Add Note</button>
                </form>
                <p className="h1 my-5 text-center">Your Notes</p>
            </div>
    </>
  )
}
