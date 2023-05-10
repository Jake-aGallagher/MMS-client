import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import RetrieveError from '../../components/error/retrieveError';
import Loading from '../../components/loading/loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';
import SortableTable from '../../components/sortableTable/sortableTable';
import { SERVER_URL } from '../../components/routing/addressAPI';

interface Job {
    id: number;
    property_id: number;
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

const jobTableConfig = {
    headers: [
        { id: 'id', name: 'Job Number', type: 'link', search: true, order: true },
        { id: 'asset_name', name: 'Asset', type: 'string', search: true, order: true },
        { id: 'type', name: 'Type', type: 'string', search: true, order: true },
        { id: 'title', name: 'Title', type: 'string', search: true, order: true },
        { id: 'created', name: 'Created', type: 'date', search: true, order: true },
        { id: 'urgency', name: 'Urgency', type: 'string', search: true, order: true },
        { id: 'required_comp_date', name: 'Required Completion Date', type: 'date', search: true, order: true },
        { id: 'status', name: 'Current Status', type: 'string', search: true, order: true },
        { id: 'completed', name: 'Completed', type: 'completed', search: true, order: true },
        { id: 'comp_date', name: 'Completed Date', type: 'date', search: true, order: true },
        { id: 'reporter', name: 'Reporter', type: 'string', search: true, order: true },
    ],
    searchable: true,
    linkColPrefix: '/jobs/',
};

const Jobs = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        getHandler();
    }, [currentProperty]);

    const getHandler = async () => {
        try {
            const jobsList = await axios.get(`${SERVER_URL}/jobs/all-jobs/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setJobs(jobsList.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full pt-12 overflow-x-auto overflow-y-auto bg-gray-100">
            <div className="fixed top-0 left-52 right-0 z-10 bg-gray-200 h-12 border-b-2 border-gray-300 flex flex-row justify-start items-center">
                <Link href="/assets" className="ml-8 hover:text-blue-600 flex flex-row items-center">
                    <div className="text-2xl mr-1 pb-1">+</div>Create Job
                </Link>
            </div>
            {loading ? (
                <Loading />
            ) : jobs.length === 0 ? (
                <div>There is no data</div>
            ) : error ? (
                <RetrieveError />
            ) : (
                <SortableTable config={jobTableConfig} data={jobs} />
            )}
        </div>
    );
};

export default Jobs;
