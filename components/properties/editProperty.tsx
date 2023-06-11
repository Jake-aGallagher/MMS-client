import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../loading/loading';
import RetrieveError from '../error/retrieveError';
import { SERVER_URL } from '../routing/addressAPI';

interface ModalProps {
    closeModal: () => void;
    propertyNumber: number;
}

const EditProperty = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const typeOptions = ['Factory', 'Commercial', 'Power station', 'Misc'];
    const [type, setType] = useState(typeOptions[0]);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [county, setCounty] = useState('');
    const [postcode, setPostcode] = useState('');

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getPropertyHandler();
    }, []);

    const getPropertyHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/properties/${props.propertyNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                const data = response.data[0];
                setId(data.id);
                setName(data.name);
                setType(data.type);
                setAddress(data.address);
                setCity(data.city);
                setCounty(data.county);
                setPostcode(data.postcode);
                setNoData(false);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${SERVER_URL}/properties`,
                {
                    id: id,
                    name: name,
                    type: type,
                    address: address,
                    city: city,
                    county: county,
                    postcode: postcode,
                },
                {
                    headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
                }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                alert('There has been an issue editing this Property, please try again.');
            }
        } catch (err) {
            alert('There has been an issue editing this Property, please try again.');
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : noData ? (
                <div>There has been an error getting your property</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
                    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">Edit Property</h1>
                    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        <label htmlFor="name">Property Name:</label>
                        <input id="name" type="text" maxLength={45} className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setName(e.target.value)} value={name} />

                        <label htmlFor="type">Property Type:</label>
                        <select id="type" className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setType(e.target.value)} defaultValue={type}>
                            {typeOptions.map((typeOption) => (
                                <option value={typeOption} key={typeOption}>
                                    {typeOption}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="address">Address:</label>
                        <input id="address" type="text" maxLength={45} className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setAddress(e.target.value)} value={address} />

                        <label htmlFor="city">City:</label>
                        <input id="city" type="text" maxLength={45} className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setCity(e.target.value)} value={city} />

                        <label htmlFor="county">County:</label>
                        <input id="county" type="text" maxLength={45} className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setCounty(e.target.value)} value={county} />

                        <label htmlFor="postcode">Postcode:</label>
                        <input
                            id="postcode"
                            type="text"
                            maxLength={45}
                            className="mb-2 rounded-sm bg-blue-200"
                            onChange={(e) => setPostcode(e.target.value)}
                            value={postcode}
                        />

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
            )}
        </>
    );
};

export default EditProperty;
