import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import RetrieveError from '../../components/error/retrieveError';
import Loading from '../../components/loading/loading';
import { useSelector } from 'react-redux';
import { RootState } from '../../components/store/store';

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

const Jobs = () => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getHandler();
    }, [currentProperty]);

    const getHandler = async () => {
        try {
            const jobsList = await axios.get(`http://localhost:3001/jobs/all-jobs/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (jobsList.data.length === 0) {
                setNoData(true);
            } else {
                setJobs(jobsList.data);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    var jobsList;
    jobsList = jobs.map((job) => (
        <tr key={job.id} className="">
            <td className="border border-solid border-gray-500 px-2 text-center p-2">
                <Link href={'/jobs/' + job.id} className="border-b-2 border-black hover:text-blue-600 hover:border-blue-600">
                    {job.id}
                </Link>
            </td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{job.asset_name}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{job.type}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{job.title}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{job.created}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{job.urgency}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{job.required_comp_date}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{job.status}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{job.completed == 1 ? <div>&#10004;</div> : <div>&#10060;</div>}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{job.comp_date == '00/00/00' ? '' : job.comp_date}</td>
            <td className="border border-solid border-gray-500 px-2 text-center p-2">{job.reporter}</td>
        </tr>
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
                <div className="w-full overflow-x-auto overflow-y-auto bg-gray-100">
                    <div className="flex flex-row ml-8 my-4 items-center">
                        <label htmlFor="search">Search:</label>
                        <input type="text" id="search" name="search" className=" ml-2 bg-blue-200 rounded-sm" />
                    </div>
                    <table className="min-w-full table-auto border-collapse border-2 border-solid border-gray-500 ">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border-2 border-solid border-gray-500 px-2">Job Number</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Asset</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Type</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Title</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Created</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Urgency</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Required completion date</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Current status</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Completed</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Completed date</th>
                                <th className="border-2 border-solid border-gray-500 px-2">Reporter</th>
                            </tr>
                        </thead>
                        <tbody>{jobsList}</tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Jobs;
