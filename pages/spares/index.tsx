import { useState, useEffect } from 'react';
import axios from 'axios';
import RetrieveError from '../../components/error/retrieveError';
import Loading from '../../components/loading/loading';
import { RootState } from '../../components/store/store';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ModalBase from '../../components/modal/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

interface Spare {
    id: number;
    part_no: string;
    man_part_no: string;
    name: string;
    man_name: string;
    description: string | null;
    notes: string | null;
    location: string;
    quant_remain: number;
    supplier: string;
    reorder_freq: string;
    reorder_num: number;
    running_low: number;
    avg_usage: number;
    cost: number;
}

interface PropsForModal {
    id: number;
    name: string;
    quantityRemaining?: number;
}

const Spares = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [spares, setSpares] = useState<Spare[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setmodalType] = useState('');
    const [modalProps, setModalProps] = useState<PropsForModal>({ id: 0, name: '' });

    useEffect(() => {
        reload();
    }, [currentProperty]);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/all-spares/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setSpares(response.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const editStock = (id: number, name: string, quantityRemaining: number) => {
        setmodalType('adjustSparesStock');
        setModalProps({ id, name, quantityRemaining });
        setViewModal(true);
    };

    const deleteItem = (id: number, name: string) => {
        setmodalType('deleteSparesItem');
        setModalProps({ id, name, quantityRemaining: 0 });
        setViewModal(true);
    };

    var sparesList;
    sparesList = spares.map((spare) => (
        <tr key={spare.id} className="">
            <td className="border border-solid border-gray-500 px-2 text-center p-2">
                <Link href={'/spares/' + spare.id} className="border-b-2 border-black hover:text-blue-600 hover:border-blue-600">
                    {spare.part_no}
                </Link>
            </td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{spare.man_part_no}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{spare.name}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{spare.man_name}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{spare.location}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">
                <div className="flex flex-row justify-center">
                    {spare.quant_remain === 0 ? (
                        <div>&#10060;</div>
                    ) : spare.avg_usage === 0 ? (
                        <div>&#10004;</div>
                    ) : spare.avg_usage != 0 && spare.quant_remain / spare.avg_usage > 1 ? (
                        <div>&#10004;</div>
                    ) : (
                        <div>&#9888;</div>
                    )}
                    {spare.quant_remain}
                </div>
            </td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{spare.avg_usage}</td>
            <td
                className="border border-solid border-gray-500 px-2 text-center p-2  hover:cursor-pointer select-none"
                onClick={(e) => editStock(spare.id, spare.name, spare.quant_remain)}
            >
                &#9998;
            </td>
            <td
                className="border border-solid border-gray-500 px-2 text-center p-2 hover:cursor-pointer select-none"
                onClick={(e) => deleteItem(spare.id, spare.name)}
            >
                &#10060;
            </td>
        </tr>
    ));

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/spares/sparesManagement" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faClipboard} className="mr-1 w-3" />
                        Spares Management
                    </Link>
                    <button
                        onClick={() => [setViewModal(true), setmodalType('addEditSparesItem'), setModalProps({ id: 0, name: '' })]}
                        className="ml-8 hover:text-blue-600 flex flex-row items-center"
                    >
                        <div className="text-2xl mr-1 pb-1">+</div>
                        Add Spares Item
                    </button>
                </div>
                {viewModal ? (
                    <ModalBase
                        modalType={modalType}
                        payload={modalProps}
                        closeModal={() => [setViewModal(false), setModalProps({ id: 0, name: '', quantityRemaining: 0 }), setmodalType(''), reload()]}
                    />
                ) : null}
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
                        <div className="flex flex-row justify-end ml-8 my-4 items-center">
                            <div className="flex flex-row items-center border-2 border-gray-500 p-1 mr-4">
                                <div>&#10004;</div>
                                <div className="mr-5 ml-1 text-sm">Greater than 1 Months supply</div>
                                <div>&#9888;</div>
                                <div className="mr-5 ml-1 text-sm">Less than 1 Months supply</div>
                                <div>&#10060;</div>
                                <div className="mr-5 ml-1 text-sm">Nil stock remaining</div>
                            </div>
                        </div>
                        <table className="min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border-2 border-solid border-gray-500 px-2">Part Number</th>
                                    <th className="border-2 border-solid border-gray-500 px-2">Manufacturers Part Number</th>
                                    <th className="border-2 border-solid border-gray-500 px-2">Name</th>
                                    <th className="border-2 border-solid border-gray-500 px-2">Manufacturers Part Name</th>
                                    <th className="border-2 border-solid border-gray-500 px-2">Location</th>
                                    <th className="border-2 border-solid border-gray-500 px-2">Remaining Stock</th>
                                    <th className="border-2 border-solid border-gray-500 px-2">Usage (Avg per Month)</th>
                                    <th className="border-2 border-solid border-gray-500 px-2">Adjust Stock</th>
                                    <th className="border-2 border-solid border-gray-500 px-2">Delete</th>
                                </tr>
                            </thead>
                            <tbody>{sparesList}</tbody>
                        </table>
                    </>
                )}
            </div>
        </>
    );
};

export default Spares;
