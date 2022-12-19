import React from "react"
import s from "./Sidebar.module.css"

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                
                className={`${s.title} ${
                    note.id === props.currentNote.id ? `${s.selectedNote}` : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className={s.textSnippet}>{note.body.split("\n")[0]}</h4>
                <button 
                    className={s.deleteBtn}
                    onClick={(event)=>props.deleteNote(event, note.id)}
                >
                   <div className={s.noneDisplay}>-</div>
                    <i className={`${s.ggTrash} ${s.trashIcon}`}></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className={`${s.pane} ${s.sidebar}`}>
            <div className={s.sidebarHeader}>
                <h3>Notes</h3>
                <button className={s.newNote} onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}