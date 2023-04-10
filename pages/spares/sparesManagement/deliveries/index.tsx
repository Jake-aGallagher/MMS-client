import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RetrieveError from '../../../../components/error/retrieveError';
import Loading from '../../../../components/loading/loading';
import ModalBase from '../../../../components/modal/modal';
import { RootState } from '../../../../components/store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface Contents {
    delivery_id: number;
    spare_id: number;
    quantity: number;
    part_no: string;
    name: string;
}

interface Delivery {
    id: number;
    name: string;
    supplier: string;
    courier: string;
    placed: string;
    due: string;
    arrived: number;
    contents: Contents[];
}

const Deliveries = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [deliveriesList, setDeliveriesList] = useState<Delivery[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [payload, setPayload] = useState<{contents: Contents[], name: string} | {id: number, name: string}>()

    useEffect(() => {
        reload()
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getHandler();
    }

    const getHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/spares/deliveries/${currentProperty}/0`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setDeliveriesList(response.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const addEditDelivery = (id: number, name: string) => {
        setPayload({ id, name });
        setModalType('addEditDelivery');
        setViewModal(true);
    };

    const items = (contents: Contents[]) => {
        const list = contents.map((i) => <li>{i.part_no + ' / ' + i.name + ' / Quantity: ' + i.quantity}</li>);
        return list;
    };

    const viewTooManyItems = (contents: Contents[], name: string) => {
        setPayload({contents, name})
        setModalType('viewExtraSpares')
        setViewModal(true)
    }

    const deliveries = deliveriesList.map((i) => (
        <tr key={'supplier' + i.id} className="">
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.id}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.name}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.supplier}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.courier}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.placed}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.due}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">
                {i.contents.length > 5 ? <button onClick={() => viewTooManyItems(i.contents, i.name)}>&#x1F50D;</button> : i.contents.length > 0 ? <ul>{items(i.contents)}</ul> : 'None'}
            </td>
            <td
                className="border border-solid border-gray-500 px-2 text-center p-2 hover:cursor-pointer select-none"
                onClick={() => addEditDelivery(i.id, i.name)}
            >
                &#9998;
            </td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{i.arrived == 1 ? <div>&#10004;</div> : <div>&#10060;</div>}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">
                <button>&#10060;</button>
            </td>
        </tr>
    ));

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/spares/sparesManagement" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to Spares Management</p>
                    </Link>
                    <button className="ml-8 hover:text-blue-600 flex flex-row items-center" onClick={(e) => addEditDelivery(0, '')}>
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Delivery
                    </button>
                </div>
                {viewModal ? <ModalBase modalType={modalType} payload={payload} closeModal={() => [setViewModal(false), setModalType(''), reload()]} /> : null}
                {loading ? (
                    <Loading />
                ) : noData ? (
                    <div>There is no data</div>
                ) : error ? (
                    <RetrieveError />
                ) : (
                    <>
                        <div className="flex flex-row ml-8 my-4 items-center">
                            <label htmlFor="search">Search:</label>
                            <input type="text" id="search" name="search" className=" ml-2 bg-blue-200 rounded-sm" />
                        </div>
                        <div className="w-full overflow-x-auto overflow-y-auto bg-gray-100 mt-6">
                            <table className="min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border-2 border-solid border-gray-500 px-2">ID</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Name</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Supplier</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Courier</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Date Placed</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Date Due</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Contents</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Edit</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Arrived</th>
                                        <th className="border-2 border-solid border-gray-500 px-2">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>{deliveries}</tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Deliveries;
