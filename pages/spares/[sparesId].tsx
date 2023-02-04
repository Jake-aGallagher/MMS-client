import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
//import ModalBase from '../../Components/Modal/ModalBase';
import { RootState } from '../../components/store/store';
import Loading from '../../components/loading/loading';
import ModalBase from '../../components/modal/modal';
import RetrieveError from '../../components/error/retrieveError';
import Link from 'next/link';
import GreaterThan from '../../public/GreaterThan.png';

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

const SparesView = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const params = useRouter();
    const [sparesDetails, setSparesDetails] = useState<Spare[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getPropertyHandler();
    }, []);

    const getPropertyHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/spares/${params.asPath.split('/')[2]}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setSparesDetails(response.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const details = sparesDetails.map((spare) => (
        <div className='w-full h-full flex flex-row' key={spare.id}>
            <div className="ml-10 mb-4 w-4/5 max-w-lg" >
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
            {viewModal ? (
                <ModalBase
                    modalType={modalType}
                    payload={parseInt(params.asPath.split('/')[2])}
                    closeModal={() => [setViewModal(false), getPropertyHandler()]}
                />
            ) : null}
            {loading ? (
                <Loading />
            ) : noData ? (
                <div>There has been an issue getting the Property Data</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <div>
                    <div className="w-full h-14 flex flex-row items-center">
                        <div>
                            <Link href="/spares" className="icon-filter  hover:text-blue-600 flex flex-row items-center">
                                <img className="h-4 rotate-180 mr-2" src={GreaterThan.src} />
                                <p className="pb-1">Return to all Spares</p>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col xl:flex-row">{details}</div>
                    <div>
                        5 most recent jobs that used one
                    </div>
                </div>
            )}
        </>
    );
};

export default SparesView;
