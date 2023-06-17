import { useEffect, useState } from 'react';
import Loading from '../loading/loading';
import RetrieveError from '../error/retrieveError';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

const AddEditEnum = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [name, setName] = useState('');
    const [allTypes, setAllTypes] = useState<{ id: number; type: string }[]>([]);
    const [type, setType] = useState(1);
    const [order, setOrder] = useState(0);
    const [effectOne, setEffectOne] = useState(0);
    const [effectTwo, setEffectTwo] = useState('DAY');

    useEffect(() => {
        if (props.payload.id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(true);
            getEnumTypes();
        }
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/enums/edit/${props.payload.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setAllTypes(response.data.enumTypes);
            const data = response.data.chosenEnum[0];
            setName(data.value);
            setType(data.enum_type_id);
            setOrder(data.list_priority);
            setEffectOne(data.payload);
            setEffectTwo(data.payload_two);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const getEnumTypes = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/enums/types`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setAllTypes(response.data.enumTypes);
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
                `${SERVER_URL}/enums`,
                {
                    id: props.payload.id ? props.payload.id : 0,
                    value: name,
                    type: type,
                    enumTypeId: type,
                    listPriority: order,
                    payload: effectOne,
                    payloadTwo: effectTwo
                },
                { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                {
                    props.payload.id > 0
                        ? alert('There has been an issue editing this Enum, please try again.')
                        : alert('There has been an issue creating this Enum, please try again.');
                }
            }
        } catch (err) {
            {
                props.payload.id > 0
                    ? alert('There has been an issue editing this Enum, please try again.')
                    : alert('There has been an issue creating this Enum, please try again.');
            }
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : error ? (
                <RetrieveError />
            ) : (
                <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
                    <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">
                        {props.payload.id > 0 ? 'Edit ' + props.payload.name : 'Add Enum'}
                    </h1>
                    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        <label htmlFor="name">Name: </label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mb-2 rounded-sm bg-blue-200" />

                        <label htmlFor="type">Type: </label>
                        <select id="type" name="type" value={type} className="mb-2 rounded-sm bg-blue-200" onChange={(e) => setType(parseInt(e.target.value))}>
                            {allTypes.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.type}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="order">Order: </label>
                        <input
                            id="order"
                            type="number"
                            min={0}
                            max={10000}
                            className="mb-2 rounded-sm bg-blue-200"
                            value={order}
                            onChange={(e) => setOrder(parseInt(e.target.value))}
                        />

                        {type === 1 ? (
                            <>
                                <label htmlFor="effectOne">Response Required Within: </label>
                                <span className="flex flex-row justify-start">
                                    <input
                                        id="effectOne"
                                        type="number"
                                        value={effectOne}
                                        onChange={(e) => setEffectOne(parseInt(e.target.value))}
                                        className="mb-2 rounded-sm bg-blue-200"
                                    />
                                    <select
                                        id="effectTwo"
                                        name="effectTwo"
                                        value={effectTwo}
                                        onChange={(e) => setEffectTwo(e.target.value)}
                                        className="mb-2 ml-4 px-2 rounded-sm bg-blue-200"
                                    >
                                        <option value={'DAY'}>DAY</option>
                                        <option value={'WEEK'}>WEEK</option>
                                        <option value={'MONTH'}>MONTH</option>
                                        <option value={'YEAR'}>YEAR</option>
                                    </select>
                                </span>
                            </>
                        ) : null}

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
            )}
        </>
    );
};

export default AddEditEnum;
