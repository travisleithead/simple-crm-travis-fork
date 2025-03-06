import { useState } from "react";
import { Note } from "./types";
import { NoteRow } from "./note-row";

export const Notes: React.FC<{ notes: Note[], addnote: boolean, onNewNote: Function }> = ({ notes, addnote, onNewNote }) => {
    const [newNoteContent, setNewNoteContent] = useState("")
    
    const sendNote = (e: React.MouseEvent) => {
        const copyOfNewNoteContent = newNoteContent;
        setNewNoteContent(""); // Clear the note for the next time...
        onNewNote(copyOfNewNoteContent);
    };
    
    return (
        <>
            {addnote && (
                <tr className="bg-gray-100">
                <td colSpan={5}>
                <button className="bg-blue-100 border-2 border-black px-5" onClick={sendNote} disabled={newNoteContent == ""}>Save Note</button>
                <textarea
                    className="w-5/6 m-1"
                    placeholder="Type your note here..."
                    onChange={e => setNewNoteContent(e.target.value)}>
                </textarea>
                </td>
            </tr>
            )}
            {notes.map(note => ( <NoteRow note={note} key={`note${note.id}`}/> ))}
        </>
    );
};
