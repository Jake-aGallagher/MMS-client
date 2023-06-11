import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; oldName: string };
}

const RenameAsset = (props: ModalProps) => {
    const [name, setName] = useState('');

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (name.length > 0) {
            try {
                const response = await axios.put(
                    `${SERVER_URL}/asset`,
                    {
                        id: props.payload.id,
                        name: name,
                    },
                    {
                        headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                    }
                );
                if (response.data.created) {
                    props.closeModal();
                } else {
                    alert('There has been an issue creating this Property, please try again.');
                }
            } catch (err) {
                alert('There has been an issue creating this Property, please try again.');
            }
        }
    };

    return (
        <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
            <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">Rename {props.payload.oldName}</h1>
            <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <label htmlFor="name">New Component Name:</label>
                <input id="name" type="text" maxLength={45} className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setName(e.target.value)} value={name} />

                <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                    <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={props.closeModal}>
                        Cancel
                    </button>
                    <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={submitHandler}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RenameAsset;
