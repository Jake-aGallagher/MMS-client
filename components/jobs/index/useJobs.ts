import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface Props {
    currentProperty: number;
}

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

export const useJobs = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        getHandler();
    }, [props.currentProperty]);

    const getHandler = async () => {
        try {
            const jobsList = await axios.get(`${SERVER_URL}/jobs/all-jobs/${props.currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setJobs(jobsList.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { jobs, loading, error };
};
