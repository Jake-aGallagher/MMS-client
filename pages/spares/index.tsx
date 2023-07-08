import { useState, useEffect } from 'react';
import axios from 'axios';
import RetrieveError from '../../components/error/retrieveError';
import Loading from '../../components/loading/loading';
import { RootState } from '../../components/store/store';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ModalBase from '../../components/modal/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClipboard, faTriangleExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import SortableTable from '../../components/sortableTable/sortableTable';
import { SERVER_URL } from '../../components/routing/addressAPI';

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
    url?: string;
}

const sparesTableConfig = {
    headers: [
        { id: 'id', name: 'Part Number', type: 'linkWithName', nameParam: 'part_no', search: true, order: true },
        { id: 'man_part_no', name: 'Manufacturers Part Number', type: 'string', search: true, order: true },
        { id: 'name', name: 'Name', type: 'string', search: true, order: true },
        { id: 'man_name', name: 'Manufacturers Part Name', type: 'string', search: true, order: true },
        { id: 'location', name: 'Location', type: 'string', search: true, order: true },
        { id: 'quant_remain', name: 'Remaining Stock', type: 'remaining_stock', search: true, order: true, avgUsagePointer: 'avg_usage' },
        { id: 'avg_usage', name: 'Usage (AVG per Month)', type: 'string', search: true, order: true },
        { id: 'adjust_stock', name: 'Adjust Stock', type: 'adjust_stock', search: false, order: false, functionIdPointer: 'id', functionNamePointer: 'name', quantRemainPonter: 'quant_remain' },
        { id: 'delete', name: 'Delete', type: 'delete', search: false, order: false, functionIdPointer: 'id', functionNamePointer: 'name' },
    ],
    searchable: true,
    linkColPrefix: '/spares/',
};

const Spares = () => {
    const [loading, setLoading] = useState(true);
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
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/all-spares/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setSpares(response.data);
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
        setModalProps({ id, name, quantityRemaining: 0, url: 'spares/spares-item' });
        setViewModal(true);
    };

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/spares/sparesManagement" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faClipboard} className="mr-1 w-3" />
                        Spares Management
                    </Link>
                    <button onClick={() => [setViewModal(true), setmodalType('addEditSparesItem'), setModalProps({ id: 0, name: '' })]} className="ml-8 hover:text-blue-600 flex flex-row items-center">
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
                ) : spares.length === 0 ? (
                    <div>There is no data</div>
                ) : error ? (
                    <RetrieveError />
                ) : (
                    <>
                        <div className="flex flex-row justify-end ml-8 my-4 items-center">
                            <div className="flex flex-row items-center border-2 border-gray-500 p-1 mr-4">
                                <div>
                                    <FontAwesomeIcon icon={faCheck} className="mr-1 w-5 text-green-500" />
                                </div>
                                <div className="mr-5 ml-1 text-sm">Greater than 1 Months supply</div>
                                <div>
                                    <FontAwesomeIcon icon={faTriangleExclamation} className="mr-1 w-5 text-yellow-500" />
                                </div>
                                <div className="mr-5 ml-1 text-sm">Less than 1 Months supply</div>
                                <div>
                                    <FontAwesomeIcon icon={faXmark} className="mr-1 w-5 text-red-600" />
                                </div>
                                <div className="mr-5 ml-1 text-sm">Nil stock remaining</div>
                            </div>
                        </div>
                        <SortableTable config={sparesTableConfig} data={spares} adjustStockFunction={editStock} deleteFunction={deleteItem} />
                    </>
                )}
            </div>
        </>
    );
};

export default Spares;
