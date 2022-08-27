import React from 'react'
import { AddNote } from './AddNote'
import { MyNotes } from './MyNotes'
import { ToastContainer, toast } from 'react-toastify';


export default function Home() {
    return (
        <>
            <ToastContainer limit={3}/>
            <AddNote />
            <MyNotes />
        </>
    )
}
