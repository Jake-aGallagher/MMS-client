import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../../components/store/store';
import RetrieveError from '../../components/error/retrieveError';
import Loading from '../../components/loading/loading';
import ModalBase from '../../components/modal/modal';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck, faPencil } from '@fortawesome/free-solid-svg-icons';

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
            <b>{j.property_name}</b>
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
            <div className="mr-4">{detail.first + ' ' + detail.last}</div>
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
            <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
                <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                    <Link href="/jobs" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-3" />
                        <p>Return to all Jobs</p>
                    </Link>
                    <button onClick={() => [setViewModal(true), setModalType('updateJob')]} className="ml-8 hover:text-blue-600 flex flex-row items-center">
                        {jobDetails.length == 0 ? null : jobDetails[0].completed == 1 ? (
                            <FontAwesomeIcon icon={faPencil} className="mr-1 w-3" />
                        ) : (
                            <FontAwesomeIcon icon={faCheck} className="mr-1 w-3" />
                        )}
                        {jobDetails.length == 0 ? null : jobDetails[0].completed == 1 ? 'Update' : 'Update & Complete'}
                    </button>
                </div>

                {loading ? (
                    <Loading />
                ) : noData ? (
                    <div>There is no data</div>
                ) : error ? (
                    <RetrieveError />
                ) : (
                    <>
                        {viewModal ? (
                            <ModalBase modalType={modalType} payload={jobDetails[0].id} closeModal={() => [setViewModal(false), getJobHandler()]} />
                        ) : (
                            ''
                        )}
                        <div className="w-full h-full grid overflow-hidden  grid-cols-5 grid-rows-12 gap-0.5">
                            {one}
                            {two}
                            {three}
                            {four}
                            {five}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default JobView;
