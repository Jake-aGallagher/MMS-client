import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';

interface ModalProps {
    closeModal: () => void;
}

const CreateProperty = (props: ModalProps) => {
    const [name, setName] = useState('');
    const typeOptions = ['Factory', 'Commercial', 'Power station', 'Misc'];
    const [type, setType] = useState(typeOptions[0]);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [county, setCounty] = useState('');
    const [postcode, setPostcode] = useState('');

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3001/properties',
                {
                    name: name,
                    type: type,
                    address: address,
                    city: city,
                    county: county,
                    postcode: postcode,
                },
                { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                alert('There has been an issue creating this Property, please try again.');
            }
        } catch (err) {
            alert('There has been an issue creating this Property, please try again.');
        }
    };

    return (
        <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
            <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">Create Property</h1>
            <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                <label htmlFor="name">Property Name:</label>
                <input id="name" type="text" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setName(e.target.value)} />

                <label htmlFor="type">property Type:</label>
                <select id="type" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setType(e.target.value)} defaultValue={type}>
                    {typeOptions.map((typeOption) => (
                        <option value={typeOption} key={typeOption}>
                            {typeOption}
                        </option>
                    ))}
                </select>

                <label htmlFor="address">Address:</label>
                <input id="address" type="text" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setAddress(e.target.value)} />

                <label htmlFor="city">City: </label>
                <input id="city" type="text" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setCity(e.target.value)} />

                <label htmlFor="county">County:</label>
                <input id="county" type="text" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setCounty(e.target.value)} />

                <label htmlFor="postcode">Postcode:</label>
                <input id="postcode" type="text" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setPostcode(e.target.value)} />

                <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                    <button
                        className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32"
                        onClick={props.closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32"
                        onClick={submitHandler}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProperty;
