import axios from "axios";
import { useState } from "react";
import { SERVER_URL } from "../routing/addressAPI";

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; note: string };
}

const AddEditAssetNotes = (props: ModalProps) => {
    const [note, setNote] = useState(props.payload.note)

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${SERVER_URL}/asset/notes`,
                {
                    id: props.payload.id,
                    note
                },
                { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                {
                    props.payload.id > 0
                        ? alert('There has been an issue editing this Note, please try again.')
                        : alert('There has been an issue creating this Note, please try again.');
                }
            }
        } catch (err) {
            {
                props.payload.id > 0
                    ? alert('There has been an issue editing this Note, please try again.')
                    : alert('There has been an issue creating this Note, please try again.');
            }
        }
    };

    return (
        <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">{props.payload.id > 0 ? 'Edit Notes' : 'Add Note'}</h1>
    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">

        <label htmlFor="note">Notes:</label>
        <textarea id="note" rows={10} className="mb-2 rounded-sm bg-blue-200" value={note} onChange={(e) => setNote(e.target.value)} />

        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={props.closeModal}>Cancel</button>
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={submitHandler}>Submit</button>
        </div>
    </form>
</div>
    )
}

export default AddEditAssetNotes