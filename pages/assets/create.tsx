import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import axios from 'axios';

interface ModalProps {
    closeModal: () => void;
    payload: { parentId: number; parentName: string };
}

const AddAsset = (props: ModalProps) => {
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [name, setName] = useState('');

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (name.length > 0) {
            try {
                const response = await axios.post(
                    'http://localhost:3001/asset',
                    {
                        parentId: props.payload.parentId,
                        propertyId: currentProperty,
                        name: name,
                    },
                    {
                        headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                    }
                );
                if (response.data.created) {
                    props.closeModal();
                } else {
                    alert('There has been an issue creating this Asset, please try again.');
                }
            } catch (err) {
                alert('There has been an issue creating this Asset, please try again.');
            }
        }
    };

    return (
        <div className="h-full w-full rounded-lg relative border-4 border-blue-600">
            <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200 border-b-4 border-blue-600">Create New Component of {props.payload.parentName}</h1>
            <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <label htmlFor="name">Component Name</label>
                <input id="name" type="text" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setName(e.target.value)} value={name} />

                <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full border-t-4 border-blue-600 bg-blue-200">
                    <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent w-32" onClick={props.closeModal}>
                        Cancel
                    </button>
                    <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent w-32" onClick={submitHandler}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

/* 
<div className="h-full w-full rounded-lg relative border-4 border-blue-600">
    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200 border-b-4 border-blue-600">Title Here</h1>
    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">

        <label htmlFor="username">Username</label>
        <input id="username" type="text" className="mb-2 rounded-sm bg-blue-200" />

        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full border-t-4 border-blue-600 bg-blue-200">
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent w-32">Cancel</button>
            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent w-32">Submit</button>
        </div>
    </form>
</div>
 */

export default AddAsset;
