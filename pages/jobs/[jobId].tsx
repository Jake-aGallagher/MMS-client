import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
//import ModalBase from '../../Components/Modal/ModalBase';
import { RootState } from '../../components/store/store';
import RetrieveError from '../../components/error/retrieveError';
import Loading from '../../components/loading/loading';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import GreaterThan from '../../public/GreaterThan.png';

interface Job {
    id: number;
    property_name: string;
    asset_name: string;
    comp_date: null | string;
    completed: number;
    created: string;
    description: string;
    logged_time: null | number;
    notes: null | string;
    reporter: string;
    required_comp_date: string;
    status: string;
    type: string;
    urgency: string;
    title: string;
}

interface TimeDetails {
    id: number;
    time: number;
    first: string;
    last: string;
}

const JobView = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const params = useRouter();
    const authLevel = useSelector((state: RootState) => state.user.value.authority);
    const [jobDetails, setJobDetails] = useState<Job[]>([]);
    const [timeDetails, setTimeDetails] = useState<TimeDetails[]>([]);
    const [viewModal, setViewModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getJobHandler();
    }, []);

    const getJobHandler = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/jobs/${params.asPath.split('/')[2]}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.jobDetails.length === 0) {
                setNoData(true);
            } else {
                setJobDetails(response.data.jobDetails);
                if (response.data.timeDetails) {
                    setTimeDetails(response.data.timeDetails);
                }
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const one = jobDetails.map((j) => (
        <div key={Math.random()} className="box row-start-1 row-end-2 col-start-1 col-end-6 pl-6 flex flex-row items-center relative">
            <div className="flex flex-col">
                <div className="mb-2">
                    <Link href="/jobs" className="icon-filter  hover:text-blue-600 flex flex-row items-center">
                        <img className="h-4 rotate-180 mr-2" src={GreaterThan.src} />
                        <p className="pb-1">Return to all Jobs</p>
                    </Link>
                </div>
                <b>{j.property_name}</b>
            </div>
            <button
                onClick={() => [setViewModal(true), setModalType('updateJob')]}
                className="absolute right-5 md:right-14 2xl:right-32 rounded-3xl bg-blue-50 hover:bg-blue-600 h-8 px-4  border-2 border-blue-600 hover:border-transparent"
            >
                {j.completed == 1 ? 'Update' : 'Update & Complete'}
            </button>
        </div>
    ));

    const two = jobDetails.map((j) => (
        <div key={Math.random()} className="box row-start-2 row-end-5 col-start-1 col-end-4 pl-6 flex flex-col justify-evenly">
            <div>
                <b>Title: </b>
                {j.title}
            </div>
            <div>
                <b>Job Id: </b>
                {j.id}
            </div>
            <div>
                <b>Asset: </b>
                {j.asset_name}
            </div>
            <div>
                <b>Type: </b>
                {j.type}
            </div>
        </div>
    ));

    const three = jobDetails.map((j) => (
        <div key={Math.random()} className="box row-start-2 row-end-5 col-start-4 col-end-6 w-full h-full flex flex-col justify-center items-center text-5xl">
            <p className="text-lg">
                <b>Completed</b>
            </p>
            {j.completed == 1 ? <div>&#10004;</div> : <div>&#10060;</div>}
        </div>
    ));

    const four = jobDetails.map((j) => (
        <div key={Math.random()} className="box row-start-5 row-end-13 col-start-1 col-end-4 p-6 flex flex-col">
            <div className="h-[50%] outline outline-blue-600 outline-2 p-2 overflow-y-auto">
                <p>
                    <b>Description: </b>
                </p>
                {j.description}
            </div>
            <div className="h-[50%] outline outline-blue-600 outline-2 p-2 overflow-y-auto">
                <p>
                    <b>Notes: </b>
                </p>
                {j.notes}
            </div>
        </div>
    ));

    const timeDetailsShow = timeDetails.map((detail) => (
        <div key={detail.id + detail.last} className="flex flex-row">
            <div className='mr-4'>{detail.first + ' ' + detail.last}</div>
            <div>{detail.time} mins</div>
        </div>
    ));

    const five = jobDetails.map((j) => (
        <div key={Math.random()} className="box row-start-5 row-end-13 col-start-4 col-end-6 pl-6 flex flex-col justify-evenly">
            <div>
                <b>Current Status: </b>
                {j.status}
            </div>
            <div>
                <b>Urgency: </b>
                {j.urgency}
            </div>
            <div>
                <b>Date Created: </b>
                {j.created}
            </div>
            <div>
                <b>Required Completion Date: </b>
                {j.required_comp_date}
            </div>
            {j.completed === 1 ? (
                <div>
                    <b>Completion Date: </b>
                    {j.comp_date}
                </div>
            ) : (
                ''
            )}
            <div>
                <b>Reported By: </b>
                {j.reporter}
            </div>
            <div>
                <b>Total Time Logged (mins): </b>
                {j.logged_time === null ? 'none' : j.logged_time}
                {timeDetailsShow}
            </div>
        </div>
    ));

    return (
        <>
            {loading ? (
                <Loading />
            ) : noData ? (
                <div>There is no data</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <>
                    {viewModal ? <ModalBase modalType={modalType} payload={jobDetails[0].id} closeModal={() => [setViewModal(false), getJobHandler()]} /> : ''}
                    <div className="w-full h-full grid overflow-hidden  grid-cols-5 grid-rows-12 gap-0.5">
                        {one}
                        {two}
                        {three}
                        {four}
                        {five}
                    </div>
                </>
            )}
        </>
    );
};

export default JobView;
