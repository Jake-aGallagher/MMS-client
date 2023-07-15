import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from '../../components/routing/addressAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import SortableTable from '../../components/sortableTable/sortableTable';
import DetailsBox from '../../components/detailsBox/detailsBox';
import LoadingNoDataError from '../../components/loading/loadingNoDataError';

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

interface RecentJobs {
    id: number;
    asset_name: string;
    type: string;
    title: string;
    created: string;
    completed: boolean;
}

const jobTableConfig = {
    headers: [
        { id: 'id', name: 'Job Number', type: 'link', search: true, order: true },
        { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
        { id: 'type', name: 'Type', type: 'string', search: true, order: true },
        { id: 'title', name: 'Title', type: 'string', search: true, order: true },
        { id: 'created', name: 'Created', type: 'date', search: true, order: true },
        { id: 'completed', name: 'Completed', type: 'completed', search: true, order: true },
    ],
    searchable: false,
    linkColPrefix: '/jobs/',
};

const SparesView = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const params = useRouter();
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [sparesDetails, setSparesDetails] = useState<Spare>();
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalProps, setModalProps] = useState({ id: 0, name: '' });
    const [recentJobs, setRecentJobs] = useState<RecentJobs[]>([]);
    const spareId = parseInt(params.asPath.split('/')[2]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getSpareItemHandler();
    };

    const getSpareItemHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spare/${spareId}/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.spares.length === 0) {
                setNoData(true);
            } else {
                setSparesDetails(response.data.spares[0]);
                if (response.data.recentJobs.length > 0) {
                    setRecentJobs(response.data.recentJobs);
                }
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const editStock = () => {
        setModalType('addEditSparesItem');
        setModalProps({ id: spareId, name: sparesDetails ? sparesDetails.name : '' });
        setViewModal(true);
    };

    const spareConfig = {
        id: sparesDetails?.id,
        fields: [
            { label: 'Part Number', value: sparesDetails?.part_no },
            { label: 'Name', value: sparesDetails?.name },
            { label: 'Manufacturers Part Number', value: sparesDetails?.man_part_no },
            { label: 'Manufacturers Part Name', value: sparesDetails?.man_name },
            { label: 'Location', value: sparesDetails?.location },
            { label: 'Quantity Remaining', value: sparesDetails?.quant_remain },
            { label: 'Supplier', value: sparesDetails?.supplier },
            { label: 'Reorder Frequency', value: sparesDetails?.reorder_freq },
            { label: 'Reorder Amount', value: sparesDetails?.reorder_num },
            { label: 'Avg Usage per Month', value: sparesDetails?.avg_usage },
            { label: 'Cost per Item', value: sparesDetails?.cost },
            { label: 'Next Delivery Due', value: 'needs implimenting' },
            { label: 'Next Delivery Quantity Expected', value: 'needs implimenting' },
        ],
    };

    const details = (
        <div className="w-full h-full flex flex-row">
            <DetailsBox data={spareConfig} />
            <div className=" p-6 flex flex-col w-full">
                <div className="h-[50%] outline outline-blue-600 outline-2 p-2 overflow-y-auto">
                    <b>Description: </b>
                    {sparesDetails?.description}
                </div>
                <div className="h-[50%] outline outline-blue-600 outline-2 p-2 overflow-y-auto">
                    <b>Notes: </b>
                    {sparesDetails?.notes}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/spares" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Spares</p>
                    </Link>
                    <button onClick={() => editStock()} className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        Edit Spares Item
                    </button>
                </div>

                {viewModal ? <ModalBase modalType={modalType} payload={modalProps} closeModal={() => [setViewModal(false), reload()]} /> : null}
                <LoadingNoDataError loading={loading} error={error} noData={noData}>
                    <>
                        <div className="flex flex-col xl:flex-row">{details}</div>
                        {recentJobs.length > 0 ? <SortableTable config={jobTableConfig} data={recentJobs} /> : null}
                    </>
                </LoadingNoDataError>
            </div>
        </>
    );
};

export default SparesView;
