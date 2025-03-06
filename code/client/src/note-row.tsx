import { Note } from "./types";

export const NoteRow: React.FC<{ note: Note }> = ({ note }) => {
    const {locale} = new Intl.DateTimeFormat().resolvedOptions();
    const stamp = new Date(note.timestamp);
    const longform = stamp.toLocaleString();
    const machineform = stamp.toISOString();
    const formatter = new Intl.DateTimeFormat(locale, {
        timeStyle: "short",
        dateStyle: "short",
    });
    const displayform = formatter.format(note.timestamp);

    return (
        <tr className="bg-gray">
            <td className="" colSpan={5}>
                <time title={longform} dateTime={machineform}>{displayform}</time>
                <textarea className="flex-grow" readOnly defaultValue={note.content}></textarea>            
            </td>
        </tr>
    );
};
