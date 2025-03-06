import { useState } from "react";
import { User } from "./types";
import axios from "axios";
import { Notes } from "./notes";

export const UserRow: React.FC<{ user: User }> = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(`${user.age}`);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [notes, setNotes] = useState(user.notes);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [addNote, setAddNote] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await axios.put(`/api/users/${user.id}`, {
                firstName,
                lastName,
                age,
                phoneNumber,
            });
            setSuccess(true);
            setIsEditing(false);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).response.data);
        }
        setLoading(false);
    };
    const handleNoteAdded = async (notecontent: string) => {        
        try {
            let noteResult = await axios.post(`/api/notes/${user.id}`, {
                content: notecontent
            });
            user.notes.push(noteResult.data);
            setNotes(user.notes);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setError((error as any).response.data); // Doesn't show up for notes...
        }
        setAddNote(false);
    };
    
    return (
        <>{isEditing ? (
            <tr>
                <td colSpan={6}>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 p-4 rounded bg-gray-100 w-96">
                        <h2 className="text-xl font-fold pr-10">Edit</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        {success && (
                            <p className="text-green-500">User added successfully</p>
                        )}
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Age"
                            value={age}
                            onChange={e => setAge(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            className="block w-full p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="block w-full p-2 bg-blue-500 text-white rounded">
                            Update User
                        </button>
                    </form>
                </td>
            </tr>
        ) : (
            <tr key={`user${user.id}`}>
                <td>
                    <button className="px-2 mx-1 border-2" onClick={() => setIsEditing(true)}>Edit</button>
                    <a className="bg-blue-100" href="#" onClick={() => setAddNote(!addNote)}>Add Note</a>
                </td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>{phoneNumber}</td>
            </tr>
        )}
        <Notes notes={notes} addnote={addNote} onNewNote={handleNoteAdded}></Notes>
        </>
    );
};
