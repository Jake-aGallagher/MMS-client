import { useEffect, useState } from 'react';
import RetrieveError from '../../../error/retrieveError';
import Loading from '../../../loading/loading';
import axios from 'axios';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';

interface ModalProps {
    closeModal: () => void;
    payload?: { id: number; name: string };
}

const AddEditSupplier = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [phone, setPhone] = useState('');
    const [primContact, setPrimContact] = useState('');
    const [primContactPhone, setPrimContactPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [county, setCounty] = useState('');
    const [postcode, setPostcode] = useState('');
    const [supplies, setSupplies] = useState('');

    useEffect(() => {
        if (props.payload && props.payload.id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/spares/supplier/${props.payload?.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const supply = response.data[0];
            if (supply.length === 0) {
                setError(true);
            } else {
                setName(supply.name);
                setWebsite(supply.website);
                setPhone(supply.phone);
                setPrimContact(supply.prim_contact);
                setPrimContactPhone(supply.prim_contact_phone);
                setAddress(supply.address);
                setCity(supply.city);
                setCounty(supply.county);
                setPostcode(supply.postcode);
                setSupplies(supply.supplies);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if (name.length > 0) {
            try {
                const response = await axios.put(
                    'http://localhost:3001/spares/supplier',
                    {
                        propertyId: currentProperty,
                        id: (props.payload?.id ? props.payload.id : 0),
                        name,
                        website,
                        phone,
                        primContact,
                        primContactPhone,
                        address,
                        city,
                        county,
                        postcode,
                        supplies
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
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <RetrieveError />
            ) : (
                <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
                    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">
                        {props.payload?.name ? 'Edit ' + props.payload.name : 'Add Supplier'}
                    </h1>
                    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        <label htmlFor="name">Name:</label>
                        <input id="name" type="text" className="mb-2 rounded-sm bg-blue-200" value={name} onChange={(e) => setName(e.target.value)} />

                        <label htmlFor="website">Website:</label>
                        <input
                            id="website"
                            type="text"
                            className="mb-2 rounded-sm bg-blue-200"
                            maxLength={100}
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />

                        <label htmlFor="phone">Phone:</label>
                        <input id="phone" type="text" className="mb-2 rounded-sm bg-blue-200" value={phone} onChange={(e) => setPhone(e.target.value)} />

                        <label htmlFor="primContact">Primary Contact:</label>
                        <input
                            id="primContact"
                            type="text"
                            className="mb-2 rounded-sm bg-blue-200"
                            value={primContact}
                            onChange={(e) => setPrimContact(e.target.value)}
                        />

                        <label htmlFor="primContactPhone">Primary Contact Phone:</label>
                        <input
                            id="primContactPhone"
                            type="text"
                            className="mb-2 rounded-sm bg-blue-200"
                            value={primContactPhone}
                            onChange={(e) => setPrimContactPhone(e.target.value)}
                        />

                        <label htmlFor="address">Address:</label>
                        <input id="address" type="text" className="mb-2 rounded-sm bg-blue-200" value={address} onChange={(e) => setAddress(e.target.value)} />

                        <label htmlFor="city">City:</label>
                        <input id="city" type="text" className="mb-2 rounded-sm bg-blue-200" value={city} onChange={(e) => setCity(e.target.value)} />

                        <label htmlFor="county">County:</label>
                        <input id="county" type="text" className="mb-2 rounded-sm bg-blue-200" value={county} onChange={(e) => setCounty(e.target.value)} />

                        <label htmlFor="postcode">Postcode:</label>
                        <input
                            id="postcode"
                            type="text"
                            className="mb-2 rounded-sm bg-blue-200"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                        />

                        <label htmlFor="supplies">Supplies:</label>
                        <input
                            id="supplies"
                            type="text"
                            className="mb-2 rounded-sm bg-blue-200"
                            maxLength={100}
                            value={supplies}
                            onChange={(e) => setSupplies(e.target.value)}
                        />

                        <div className="flex flex-row justify-evenly items-center absolute bottom-0 h-16 left-0 w-full bg-blue-200">
                            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={props.closeModal}>Cancel</button>
                            <button className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 w-32" onClick={(e) => submitHandler(e)}>Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default AddEditSupplier;
