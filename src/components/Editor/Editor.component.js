import React from "react"
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"
import Showdown from "showdown"
import s from "../Editor/Editor.module.css"

export default function Editor({ currentNote, updateNote, clearNote, downloadNote }) {
    const [selectedTab, setSelectedTab] = React.useState("write")

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })

    return (
        <section className={`${s.pane} ${s.editor} ${s.container}`}>
            <label>
                <ReactMde
                    value={currentNote.body}
                    onChange={updateNote}
                    selectedTab={selectedTab}
                    onTabChange={setSelectedTab}
                    generateMarkdownPreview={(markdown) =>
                        Promise.resolve(converter.makeHtml(markdown))
                    }
                    minEditorHeight={80}
                    heightUnits="vh"
                />
            </label>
            <div className={s.buttonsBlok}>
                <button className={s.button}
                    onClick={() => clearNote(currentNote)}>
                    Clean
                </button>
                <button className={s.button}
                    onClick={() => downloadNote(currentNote)}>
                    Save
                </button>
            </div>
        </section>
    )
}