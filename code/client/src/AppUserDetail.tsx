//import { AddUser } from "./add-user";
import { User, Note } from "./types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { NoteRow } from "./note-row";

export const AppUserDetail: React.FC = () => {

    const { id } = useParams();
    const [error, setError] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`/api/users/${id}`);
            const user:User = result.data;
            if (!user) {
                setError(true);
                return;
            }
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setAge(user.age);
            setPhoneNumber(user.phoneNumber);
            setNotes(user.notes);
        };
        fetchData();
    }, [id]);

    if (error) {
        return (
            <div className="p-4 space-y-8">
            <h1 className="text-xl">SimpleCrm</h1>
            <Link to="/">Return to all users</Link>
            <h1>User not found!</h1>
            </div>
        );
    }
    return (
        <div className="p-4 space-y-8">
            <h1 className="text-xl">SimpleCrm</h1>
            <Link to="/">Return to all users</Link>
            <h2>User Details for {id}</h2>
            <section>
                <table>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{firstName} {lastName}</td>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>{age}</td>
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td>{phoneNumber}</td>
                    </tr>
                    </tbody>
                </table>
            </section>
            <section>
                <table>
                    <tbody>
                        {notes.map(note => 
                            <NoteRow note={note} key={`note${note.id}`}></NoteRow>
                        )}                        
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default AppUserDetail;
