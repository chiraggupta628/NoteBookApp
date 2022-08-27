import React from 'react'
import { useRef,useState } from 'react'
import { useContext,useEffect } from 'react'
import NoteContext from '../context/NoteContext'
import { useNavigate, Link } from 'react-router-dom'

import { NoteItem } from './NoteItem'

export const MyNotes = () => {
    const context = useContext(NoteContext);
    const {notes,getAllNotes,editNote} = context;
    const navigate = useNavigate()
     const [note, setnote] = useState({"id":"","enoteTitle":"","enoteDescription":"","enoteTag":""})
    const handleEditNote = (e)=>{
        closeRef.current.click();
        e.preventDefault();
        editNote(note.id,note.enoteTitle,note.enoteDescription,note.enoteTag);
    }
    const onChange = (e)=>{
        setnote({...note,[e.target.name]:e.target.value});
    }
    useEffect(() => {
      if(localStorage.getItem('token'))
         getAllNotes();
      else{
        navigate("/login");
      }
    }, [])
    const ref = useRef(null);
    const closeRef = useRef(null);
    const updateNote = (currentNote)=>{
      ref.current.click();
      setnote({"id":currentNote._id,"enoteTitle":currentNote.title,"enoteTag":currentNote.tag,"enoteDescription":currentNote.description});
    }
  return (
    <>
      <button ref = {ref} type="button" className="btn btn-primary d-none" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form>
                    <div className="form-group my-3">
                        <label htmlFor="formGroupExampleInput">Title :-</label>
                        <input type="text" className="form-control" id="enoteTitle" name="enoteTitle" value ={note.enoteTitle} onChange={onChange}/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="formGroupExampleInput2">Tag :-</label>
                        <input type="text" className="form-control" id="enoteTag" name="enoteTag" value={note.enoteTag } onChange={onChange}/>
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="exampleFormControlTextarea1">Description :- </label>
                        <textarea className="form-control" id="enoteDescription" name="enoteDescription" value={note.enoteDescription} onChange={onChange} rows="3"></textarea>
                    </div>
                </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeRef} className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                            <button type="button" onClick={handleEditNote} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
    <div className="container my-3">
    <div className='row'>
    {notes.map((element)=>{
        return <div className="col-lg-4 d-flex align-items-stretch my-3" key={element._id} >
        <NoteItem  updateNote={updateNote} note={element}/>
       </div> 
    })}
    </div>
    </div>
    </>
  )
}
