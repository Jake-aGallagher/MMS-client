import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '../../components/loading/loading';
import ModalBase from '../../components/modal/modal';
import RetrieveError from '../../components/error/retrieveError';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import { SERVER_URL } from '../../components/routing/addressAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import SortableTable from '../../components/sortableTable/sortableTable';

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
    const [sparesDetails, setSparesDetails] = useState<Spare[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalProps, setModalProps] = useState({ id: 0, name: '' });
    const [recentJobs, setRecentJobs] = useState<RecentJobs[]>([])
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
            const response = await axios.get(`${SERVER_URL}/spares/${spareId}/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.spares.length === 0) {
                setNoData(true);
            } else {
                setSparesDetails(response.data.spares);
                if (response.data.recentJobs.length > 0) {
                    setRecentJobs(response.data.recentJobs)
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
        setModalProps({ id: spareId, name: sparesDetails[0].name });
        setViewModal(true);
    };

    const details = sparesDetails.map((spare) => (
        <div className="w-full h-full flex flex-row" key={spare.id}>
            <div className="ml-10 mb-4 w-4/5 max-w-lg">
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Part Number: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">{spare.part_no}</div>
                </div>
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Name: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">{spare.name}</div>
                </div>
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Manufacturers Part Number: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">{spare.man_part_no}</div>
                </div>
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Manufacturers Part Name: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">{spare.man_name}</div>
                </div>

                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Location: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">{spare.location}</div>
                </div>
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Quantity Remaining: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">{spare.quant_remain}</div>
                </div>
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Supplier: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">{spare.supplier}</div>
                </div>
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Reorder Frequency: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">{spare.reorder_freq}</div>
                </div>
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Reorder Amount: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">{spare.reorder_num}</div>
                </div>
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Avg Usage per Month: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">{spare.avg_usage}</div>
                </div>
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Cost per item: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">{spare.cost}</div>
                </div>
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Next Delivery Due: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">Wednesday</div>
                </div>
                <div className="flex flex-row h-6 mb-3">
                    <div className="w-1/2 pl-1 border-b-2">Next Delivery Quantity Expected: </div>
                    <div className="w-1/2 border-b-2 flex flex-row justify-center">15</div>
                </div>
            </div>
            <div key={Math.random()} className=" p-6 flex flex-col w-full">
                <div className="h-[50%] outline outline-blue-600 outline-2 p-2 overflow-y-auto">
                    <p>
                        <b>Description: </b>
                    </p>
                    {spare.description}
                </div>
                <div className="h-[50%] outline outline-blue-600 outline-2 p-2 overflow-y-auto">
                    <p>
                        <b>Notes: </b>
                    </p>
                    {spare.notes}
                </div>
            </div>
        </div>
    ));

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
                {loading ? (
                    <Loading />
                ) : noData ? (
                    <div>There has been an issue getting the Property Data</div>
                ) : error ? (
                    <RetrieveError />
                ) : (
                    <>
                        <div className="flex flex-col xl:flex-row">{details}</div>
                        {recentJobs.length > 0 ? (
                            <SortableTable config={jobTableConfig} data={recentJobs} />
                        ) : null}
                    </>
                )}
            </div>
        </>
    );
};

export default SparesView;
