export interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;

    notes: Note[];
}

export interface Note {
    id: number;       // Unique id of this note
    user: User;   // Which user this note is attached to
    content: string;
    timestamp: number;
}