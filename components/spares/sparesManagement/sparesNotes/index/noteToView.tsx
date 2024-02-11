import { SetStateAction } from 'react';

interface Props {
    notes: {
        id: number;
        title: string;
        content: string;
        created_date: string;
    }[];
    viewNote: number;
    setViewNote: (value: SetStateAction<number>) => void;
}

const NoteToView = (props: Props) => {
    const focusedNote = props.notes.find((x) => x.id === props.viewNote);
    if (focusedNote) {
        return (
            <div className="flex flex-col mt-4 ml-6 bg-secondary p-4 rounded-md shadow-md">
                <div className="flex flex-row mb-2 font-semibold">
                    <div className="mr-5">{focusedNote.title}</div>
                    <div>{focusedNote.created_date}</div>
                    <button
                        className="btnBlue ml-auto text-sm h-6 px-3"
                        onClick={() => props.setViewNote(0)}
                    >
                        Close Note
                    </button>
                </div>
                <div>{focusedNote.content}</div>
            </div>
        );
    } else {
        return <></>
    }
};

export default NoteToView;
