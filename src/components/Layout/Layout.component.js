import React from "react";
import Split from "react-split";
import { nanoid } from "nanoid";
import s from "./Layout.module.css";

import Editor from "../Editor/Editor.component";
import Sidebar from "../Sidebar/Sidebar.component";
 



export default function Layout() {
    const [notes, setNotes] = React.useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    )
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )


    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }

    function updateNote(text) {
        setNotes(oldNotes => {
            const newArray = []
            for(let i = 0; i < oldNotes.length; i++) {
                const oldNote = oldNotes[i]
                if(oldNote.id === currentNoteId) {
                    newArray.unshift({ ...oldNote, body: text })
                } else {
                    newArray.push(oldNote)
                }
            }
            return newArray
        })
    }

    function deleteNote(event, noteId)
    {
        event.stopPropagation()
        setNotes(oldNotes =>oldNotes.filter(note=>note.id !==noteId))
    }

    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

    function clearNote(currentNote){
        currentNote.body="# Type your markdown note's title here"
        updateNote(currentNote.body)
    }

    function downloadNote(currentNote) {
        const element = document.createElement("a");
        const file = new Blob([currentNote.body], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "myNote.txt";
        document.body.appendChild(element);
        element.click();
      }



    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))

    }, [notes])

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className={s.split}
                    >
                        <Sidebar
                            notes={notes}
                            currentNote={findCurrentNote()}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        {
                            currentNoteId &&
                            notes.length > 0 &&
                            <Editor
                                currentNote={findCurrentNote()}
                                updateNote={updateNote}
                                clearNote={clearNote}
                                downloadNote={downloadNote}
                            />
                        }
                    </Split>
                    :
                    <div className={s.noNotes}>
                        <h1>You have no notes</h1>
                        <button
                            className={s.firstNote}
                            onClick={createNewNote}
                        >
                            Create one now
                        </button>
                    </div>

            }
        </main>
    )
}