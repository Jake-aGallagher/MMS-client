import { SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

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
            url?: string;
        }>
    ) => void;
}

const NoteTitlesList = (props: Props) => {
    const permissions = useSelector((state: RootState) => state.permissions.value.permissions);
    const isAdmin = useSelector((state: RootState) => state.user.value.isAdmin);

    const noteTitles = props.notes.map((note) => (
        <div key={note.id + 'title'} className="flex flex-row rounded-md pl-6 mt-1 hover:outline-2 hover:outline outline-accent p-1">
            <div className="mr-5">{note.title}</div>
            <div className="flex flex-row justify-end ml-auto">
                <div>{note.created_date}</div>
                <button onClick={() => props.setViewNote(note.id)} className="btnBlue ml-5 text-sm h-6 px-3">
                    View
                </button>
                {permissions.sparesManagement?.manage || isAdmin ? (
                    <>
                        <button
                            onClick={() => [props.setViewModal(true), props.setModalType('addEditSparesNote'), props.setEditNoteData({ id: note.id, title: note.title })]}
                            className="btnBlue ml-5 text-sm h-6 px-3"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => [props.setViewModal(true), props.setModalType('deleteSparesNote'), props.setEditNoteData({ id: note.id, title: note.title, url: 'spares/note' })]}
                            className="btnRed ml-5 text-sm h-6 px-3"
                        >
                            Delete
                        </button>
                    </>
                ) : null}
            </div>
        </div>
    ));
    return <div className="w-max">{noteTitles}</div>;
};

export default NoteTitlesList;
