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
        <>
        <h1 className="p-5 text-xl">SimpleCrm</h1>
        <span className="px-5 border-2 rounded-lg m-5"><Link to="/">Return to all users</Link></span>
        <div className="p-5 grid grid-cols-3 gap-5 items-start">    
            <section className="rounded-lg p-5 bg-yellow-50">
                <h2 className="text-2xl pb-5">User Details for {firstName}</h2>
                <table cellPadding={2}>
                    <tbody>
                    <tr>
                        <td className="font-bold px-5">Name</td>
                        <td>{firstName} {lastName}</td>
                    </tr>
                    <tr>
                        <td className="font-bold px-5">Age</td>
                        <td>{age}</td>
                    </tr>
                    <tr>
                        <td className="font-bold px-5">Phone</td>
                        <td>{phoneNumber}</td>
                    </tr>
                    </tbody>
                </table>
            </section>
            <section className="rounded-lg col-span-2 p-5 bg-blue-50">
                <h2 className="text-2xl pb-5">Notes</h2>
                <table className="w-full">
                    <tbody>
                        {notes.map(note => 
                            <NoteRow note={note} key={`note${note.id}`}></NoteRow>
                        )}                        
                    </tbody>
                </table>
            </section>
        </div>
        </>
    );
};

export default AppUserDetail;
