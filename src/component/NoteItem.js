import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/NoteContext';

export const NoteItem = (props) => {
    const { note } = props;
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>

                </div>
                <div className="row">
                    <div className="col-md-1">
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{props.updateNote(note)}}></i></div>
                    <div className="col-md-1">
                        <i className="fa-regular fa-trash-can mx-2 " onClick={()=>{deleteNote(note._id)}}></i></div>
                </div>
            </div>
        </>
    )
}
