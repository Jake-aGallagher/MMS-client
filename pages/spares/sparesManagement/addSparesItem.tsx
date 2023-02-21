import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../components/store/store';
import axios from 'axios';
import Loading from '../../../components/loading/loading';
import RetrieveError from '../../../components/error/retrieveError';

interface ModalProps {
    closeModal: () => void;
    payload?: { id: number; name: string };
}

interface Spare {
    id: number;
    part_no: string;
    man_part_no: string;
    name: string;
    man_name: string;
    description: string;
    notes: string;
    location: string;
    quant_remain: number;
    supplier: string;
    reorder_freq: string;
    reorder_num: number;
    running_low: number;
    avg_usage: number;
    cost: number;
}

const AddSparesItem = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [partNo, setPartNo] = useState('');
    const [manPartNo, setManPartNo] = useState('');
    const [name, setName] = useState('');
    const [manName, setManName] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [location, setLocation] = useState('');
    const [quantRemaining, setQuantRemaining] = useState(0);
    const [supplier, setSupplier] = useState('');
    const [cost, setCost] = useState(0);

    useEffect(() => {
        if (props.payload?.id && props.payload?.id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getHandler = async () => {
        try {
            const spare = await axios.get(`http://localhost:3001/spares/${props.payload?.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const s: Spare = spare.data[0]

            setPartNo(s.part_no)
            setManPartNo(s.man_part_no)
            setName(s.name)
            setManName(s.man_name)
            setDescription(s.description)
            setNotes(s.notes)
            setLocation(s.location)
            setQuantRemaining(s.quant_remain)
            setSupplier(s.supplier)
            setCost(s.cost)

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
                'http://localhost:3001/spares/add-edit',
                {
                    partNo,
                    manPartNo,
                    name,
                    manName,
                    description,
                    notes,
                    location,
                    quantRemaining,
                    supplier,
                    cost,
                    propertyId: currentProperty,
                    id: props.payload?.id ? props.payload.id : 0,
                },
                { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                alert('There has been an issue creating this Spares Item, please try again.');
            }
        } catch (err) {
            alert('There has been an issue creating this Spares Item, please try again.');
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
                        {props.payload?.name && props.payload?.name.length > 0 ? props.payload.name : 'Create Spares Item'}
                    </h1>
                    <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                        <label htmlFor="name">Part Number:</label>
                        <input id="name" type="text" className="mb-2 rounded-sm bg-blue-200" value={partNo} onChange={(e) => setPartNo(e.target.value)} />

                        <label htmlFor="name">Manufacturers Part Number:</label>
                        <input id="name" type="text" className="mb-2 rounded-sm bg-blue-200" value={manPartNo} onChange={(e) => setManPartNo(e.target.value)} />

                        <label htmlFor="name">Item Name:</label>
                        <input id="name" type="text" className="mb-2 rounded-sm bg-blue-200" value={name} onChange={(e) => setName(e.target.value)} />

                        <label htmlFor="name">Manufacturers Item Name:</label>
                        <input id="name" type="text" className="mb-2 rounded-sm bg-blue-200" value={manName} onChange={(e) => setManName(e.target.value)} />

                        <label htmlFor="name">Description:</label>
                        <textarea id="name" rows={4} className="mb-2 rounded-sm bg-blue-200" value={description} onChange={(e) => setDescription(e.target.value)} />

                        <label htmlFor="name">Notes:</label>
                        <textarea id="name" rows={4} className="mb-2 rounded-sm bg-blue-200" value={notes} onChange={(e) => setNotes(e.target.value)} />

                        <label htmlFor="name">Location:</label>
                        <input id="name" type="text" className="mb-2 rounded-sm bg-blue-200" value={location} onChange={(e) => setLocation(e.target.value)} />

                        <label htmlFor="name">Quantity in Stock:</label>
                        <input id="name" type="number" min={0} className="mb-2 rounded-sm bg-blue-200" value={quantRemaining} onChange={(e) => setQuantRemaining(parseInt(e.target.value))} />

                        <label htmlFor="name">Supplier:</label>
                        <input id="name" type="text" className="mb-2 rounded-sm bg-blue-200" value={supplier} onChange={(e) => setSupplier(e.target.value)} />

                        <label htmlFor="name">Cost per Item:</label>
                        <input id="name" type="number" min={0} className="mb-6 rounded-sm bg-blue-200" value={cost} onChange={(e) => setCost(parseInt(e.target.value))} />

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

export default AddSparesItem;
