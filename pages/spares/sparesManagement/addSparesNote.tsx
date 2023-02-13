import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';

interface ModalProps {
    closeModal: () => void;
    payload?: { id: number; title: string };
}

const AddSparesNote = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [count, setcount] = useState(0);
    const noteId = props.payload ? props.payload?.id : 0;

    useEffect(() => {
        if (props.payload) {
            setError(false);
            setLoading(true);
            getHandler();
        }
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/spares/note/${props.payload?.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setTitle(response.data[0].title);
            setNote(response.data[0].content);
            setcount(response.data[0].content.length);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (title.length > 0 && note.length > 0) {
            try {
                const response = await axios.post(
                    'http://localhost:3001/spares/notes',
                    {
                        propertyId: currentProperty,
                        title,
                        note,
                        noteId
                    },
                    {
                        headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                    }
                );
                if (response.data.created) {
                    props.closeModal();
                } else {
                    alert('There has been an issue creating this Note, please try again.');
                }
            } catch (err) {
                alert('There has been an issue creating this Note, please try again.');
            }
        }
    };

    return (
        <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
            <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">
                {props.payload?.title ? props.payload?.title : 'Add Note'}
            </h1>
            <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <div className="text-center">This note will be visible to anyone who visits the Spares Management Page</div>

                <label htmlFor="title">Title:</label>
                <input id="title" type="text" className="mb-2 rounded-sm bg-blue-200" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor="note">Note:</label>
                <textarea
                    id="note"
                    className="my-2 rounded-sm bg-blue-200"
                    rows={12}
                    maxLength={1000}
                    value={note}
                    onChange={(e) => [setNote(e.target.value), setcount(e.target.value.length)]}
                />

                <div className="text-center">{count} / 1000 Charachters</div>

                <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                    <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={props.closeModal}>
                        Cancel
                    </button>
                    <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={(e) => submitHandler(e)}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSparesNote;
