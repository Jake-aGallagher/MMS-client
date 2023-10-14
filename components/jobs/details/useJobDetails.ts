import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import axios from 'axios';

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

interface UsedSpares {
    id: number;
    quantity: number;
    part_no: string;
    name: string;
}

export const useJobDetails = (jobId: string) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [jobDetails, setJobDetails] = useState<Job>();
    const [timeDetails, setTimeDetails] = useState<TimeDetails[]>([]);
    const [sparesDetails, setSparesDetails] = useState<UsedSpares[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getJobHandler();
    };

    const getJobHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/jobs/${jobId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.jobDetails.length === 0) {
                setNoData(true);
            } else {
                setJobDetails(response.data.jobDetails[0]);
                if (response.data.timeDetails) {
                    setTimeDetails(response.data.timeDetails);
                }
                if (response.data.usedSpares) {
                    setSparesDetails(response.data.usedSpares);
                }
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { jobDetails, timeDetails, sparesDetails, loading, noData, error, reload };
};
