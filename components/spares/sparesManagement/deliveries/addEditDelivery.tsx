import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import axios from 'axios';
import Loading from '../../../loading/loading';
import RetrieveError from '../../../error/retrieveError';
import ModalBase from '../../../modal/modal';

interface ModalProps {
    closeModal: () => void;
    payload: { id: number; name: string };
}

interface Supplier {
    id: number;
    name: string;
}

interface Contents {
    id: number;
    part_no: string;
    name: string;
    num_used: number;
}

interface RetrievedContents {
    spare_id: number;
    part_no: string;
    name: string;
    quantity: number;
}

interface Delivery {
    id: number;
    name: string;
    supplier: string;
    courier: string;
    placed: string;
    due: string;
    contents: Contents[];
}

const AddEditDelivery = (props: ModalProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [suppliersList, setSuppliersList] = useState<Supplier[]>();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [supplier, setSupplier] = useState(0);
    const [courier, setCourier] = useState('');
    const [placed, setPlaced] = useState('');
    const [due, setDue] = useState('');
    const [contents, setContents] = useState<Contents[]>([]);
    const [viewModal, setViewModal] = useState(false);

    useEffect(() => {
        if (props.payload.id > 0) {
            setLoading(true);
            setError(false);
            getHandlerFull();
        } else {
            setLoading(true);
            setError(false);
            getHandlerLimited();
        }
    }, []);

    const getHandlerLimited = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/spares/suppliers/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setSuppliersList(response.data);
            setSupplier(response.data[0].id);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const getHandlerFull = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/spares/deliveries/${currentProperty}/${props.payload.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const suppliers = response.data.suppliers
            setSuppliersList(suppliers);
            const delivery = response.data.deliverywithContents[0]
            setId(delivery.id);
            setName(delivery.name);
            setSupplier(delivery.supplier);
            setCourier(delivery.courier);
            setPlaced(delivery.placed);
            setDue(delivery.due);
            formatContents(delivery.contents);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    // todo adjust architecture of used spares to use quantity so that the following function can be removed
    // This is a stop gap function required due to tight coupling but incorrect typings of the used spares modal helper
    const formatContents = (deliveryItems: RetrievedContents[]) => {
        const adjustedContentsArr: Contents[] = [];

        deliveryItems.forEach((deliveryItem) => {
            adjustedContentsArr.push({ id: deliveryItem.spare_id, part_no: deliveryItem.part_no, name: deliveryItem.name, num_used: deliveryItem.quantity });
        });

        setContents(adjustedContentsArr);
    };

    const addSparesHandler = (
        spares: {
            id: number;
            part_no: string;
            name: string;
            num_used: number;
        }[]
    ) => {
        setContents(spares);
    };

    const submitHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                'http://localhost:3001/spares/delivery/add-edit',
                {
                    name,
                    supplier,
                    courier,
                    placed,
                    due,
                    contents,
                    propertyId: currentProperty,
                    deliveryId: props.payload.id,
                },
                { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } }
            );
            if (response.data.created) {
                props.closeModal();
            } else {
                {
                    props.payload?.name && props.payload?.name.length > 0
                        ? alert('There has been an issue editing this Delivery, please try again.')
                        : alert('There has been an issue creating this Delivery, please try again.');
                }
            }
        } catch (err) {
            {
                props.payload?.name && props.payload?.name.length > 0
                    ? alert('There has been an issue editing this Delivery, please try again.')
                    : alert('There has been an issue creating this Delivery, please try again.');
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
                <>
                    {viewModal ? (
                        <ModalBase
                            modalType="sparesUsed"
                            payload={{ sparesUsed: contents, type: 'delivery' }}
                            fullSize={true}
                            passbackDeatails={addSparesHandler}
                            closeModal={() => setViewModal(false)}
                        />
                    ) : (
                        ''
                    )}
                    <div className="h-full w-full rounded-lg relative border-4 border-blue-200">
                        <h1 className="w-full h-10 flex flex-row justify-center items-center font-bold bg-blue-200">
                            {props.payload.name.length > 0 ? props.payload.name : 'Add Delivery'}
                        </h1>
                        <form className="flex flex-col justify-start px-4 pt-2 overflow-y-auto h-[calc(100%-104px)]">
                            <label htmlFor="name">Delivery Name:</label>
                            <input id="name" type="text" className="mb-2 rounded-sm bg-blue-200" value={name} onChange={(e) => setName(e.target.value)} />

                            <label htmlFor="supplier">Supplier:</label>
                            <select
                                id="supplier"
                                className="mb-2 rounded-sm bg-blue-200"
                                value={supplier}
                                onChange={(e) => setSupplier(parseInt(e.target.value))}
                            >
                                {suppliersList?.map((i) => (
                                    <option key={'supplier_' + i.id} value={i.id}>
                                        {i.name}
                                    </option>
                                ))}
                            </select>

                            <label htmlFor="courier">Courier:</label>
                            <input
                                id="courier"
                                type="text"
                                className="mb-2 rounded-sm bg-blue-200"
                                value={courier}
                                onChange={(e) => setCourier(e.target.value)}
                            />

                            <label htmlFor="placed">Placed:</label>
                            <input id="placed" type="date" className="mb-2 rounded-sm bg-blue-200" value={placed} onChange={(e) => setPlaced(e.target.value)} />

                            <label htmlFor="due">Due:</label>
                            <input id="due" type="date" className="mb-2 rounded-sm bg-blue-200" value={due} onChange={(e) => setDue(e.target.value)} />

                            <button
                                className="rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 my-2 border-2 border-blue-600"
                                onClick={(e) => [e.preventDefault(), setViewModal(true)]}
                            >
                                Add Spares to Delivery
                            </button>
                            <div>
                                {contents.map((spare) => (
                                    <div
                                        key={spare.id}
                                        className={`flex flex-row border-2 border-blue-600 rounded-md my-4 w-fit px-2 ${spare.num_used < 1 ? 'hidden' : ''}`}
                                    >
                                        <div className="mr-4">{spare.part_no}</div>
                                        <div className="mr-4">{spare.name}</div>
                                        <div>Quantity Ordered: {spare.num_used}</div>
                                    </div>
                                ))}
                            </div>

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
                </>
            )}
        </>
    );
};

export default AddEditDelivery;
