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
import SortableTable from '../../../../components/sortableTable/sortableTable';
import { SERVER_URL } from '../../../../components/routing/addressAPI';

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

const deliveriesTableConfig = {
    headers: [
        { id: 'id', name: 'ID', type: 'string', search: true, order: true },
        { id: 'name', name: 'Name', type: 'string', search: true, order: true },
        { id: 'supplier', name: 'Supplier', type: 'string', search: true, order: true },
        { id: 'courier', name: 'Courier', type: 'string', search: true, order: true },
        { id: 'placed', name: 'Date Placed', type: 'date', search: true, order: true },
        { id: 'due', name: 'Date Due', type: 'date', search: true, order: true },
        { id: 'contents', name: 'Contents', type: 'contents', search: false, order: false, functionNamePointer: 'name' },
        { id: 'arrived', name: 'Arrived', type: 'arrived', search: true, order: true },
        { id: 'edit', name: 'Edit', type: 'editWithHide', search: false, order: false, functionIdPointer: 'id', functionNamePointer: 'name', hidePointer: 'arrived' },
        { id: 'delete', name: 'Delete', type: 'deleteWithHide', search: false, order: false, functionIdPointer: 'id', functionNamePointer: 'name', hidePointer: 'arrived' },
    ],
    searchable: true,
};

const Deliveries = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [deliveriesList, setDeliveriesList] = useState<Delivery[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [payload, setPayload] = useState<{ contents: Contents[]; name: string } | { id: number; name: string; url?: string }>();

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
            const response = await axios.get(`${SERVER_URL}/spares/deliveries/${currentProperty}/0`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setDeliveriesList(response.data);
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

    const deleteDelvery = (id: number, name: string) => {
        setPayload({ id, name, url: 'spares/delivery' });
        setModalType('deleteDelivery');
        setViewModal(true);
    };

    const viewTooManyItems = (contents: Contents[], name: string) => {
        setPayload({ contents, name });
        setModalType('viewExtraSpares');
        setViewModal(true);
    };

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
                ) : deliveriesList.length === 0 ? (
                    <div>There is no data</div>
                ) : error ? (
                    <RetrieveError />
                ) : (
                    <>
                        <div className="w-full overflow-x-auto overflow-y-auto bg-gray-100">
                            <SortableTable config={deliveriesTableConfig} data={deliveriesList} editFunction={addEditDelivery} deleteFunction={deleteDelvery} viewTooManyItems={viewTooManyItems} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Deliveries;
