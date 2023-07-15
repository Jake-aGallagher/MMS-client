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
        <div key={note.id + 'title'} className="flex flex-row rounded-md pl-6 mt-1 hover:outline-2 hover:outline hover:outline-blue-600 p-1">
            <div className="mr-5">{note.title}</div>
            <div className="flex flex-row justify-end ml-auto">
                <div>{note.created_date}</div>
                <button
                    onClick={() => props.setViewNote(note.id)}
                    className="rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                >
                    View
                </button>
                <button
                    onClick={() => [props.setViewModal(true), props.setModalType('addEditSparesNote'), props.setEditNoteData({ id: note.id, title: note.title })]}
                    className="rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-blue-600 h-6 px-3 border-2 border-blue-600 hover:border-transparent"
                >
                    Edit
                </button>
                <button
                    onClick={() => [props.setViewModal(true), props.setModalType('deleteSparesNote'), props.setEditNoteData({ id: note.id, title: note.title })]}
                    className="rounded-xl ml-5 text-sm font-normal bg-blue-50 hover:bg-red-600 h-6 px-3 border-2 border-red-600 hover:text-white hover:border-transparent"
                >
                    Delete
                </button>
            </div>
        </div>
    ));
    return <div className="w-max">{noteTitles}</div>;
};

export default NoteTitlesList;
