import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';

interface JobType {
    id: number;
    value: string;
    list_priority: number;
}


export const useJobTypes = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [jobTypes, setJobTypes] = useState<JobType[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/jobtypes`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setJobTypes(response.data.jobTypes);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { jobTypes, loading, error, reload };
};