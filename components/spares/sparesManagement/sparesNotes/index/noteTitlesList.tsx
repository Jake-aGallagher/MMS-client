import { SetStateAction } from 'react';

interface Props {
    notes: {
        id: number;
        title: string;
        content: string;
        created_date: string;
    }[];
    setViewNote: (value: SetStateAction<number>) => void;
    setViewModal: (value: SetStateAction<boolean>) => void;
    setModalType: (value: SetStateAction<string>) => void;
    setEditNoteData: (
        value: SetStateAction<{
            id: number;
            title: string;
        }>
    ) => void;
}

const NoteTitlesList = (props: Props) => {
    const noteTitles = props.notes.map((note) => (
        <div key={note.id + 'title'} className="flex flex-row rounded-md pl-6 mt-1 hover:outline-2 hover:outline outline-accent p-1 transition-all">
            <div className="mr-5">{note.title}</div>
            <div className="flex flex-row justify-end ml-auto">
                <div>{note.created_date}</div>
                <button
                    onClick={() => props.setViewNote(note.id)}
                    className="rounded-md ml-5 text-sm font-normal bg-background hover:bg-secondary h-6 px-3 border-2 border-accent hover:border-primary transition-all"
                >
                    View
                </button>
                <button
                    onClick={() => [props.setViewModal(true), props.setModalType('addEditSparesNote'), props.setEditNoteData({ id: note.id, title: note.title })]}
                    className="rounded-md ml-5 text-sm font-normal bg-background hover:bg-secondary h-6 px-3 border-2 border-accent hover:border-primary transition-all"
                >
                    Edit
                </button>
                <button
                    onClick={() => [props.setViewModal(true), props.setModalType('deleteSparesNote'), props.setEditNoteData({ id: note.id, title: note.title })]}
                    className="rounded-md ml-5 text-sm font-normal bg-background hover:bg-red h-6 px-3 border-2 border-red hover:text-background transition-all"
                >
                    Delete
                </button>
            </div>
        </div>
    ));
    return <div className="w-max">{noteTitles}</div>;
};

export default NoteTitlesList;
