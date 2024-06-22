import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import { GlobalDebug } from '../../../debug/globalDebug';

interface Props {
    currentFacility: number;
}

interface Job {
    id: number;
    facility_id: number;
    asset_name: string;
    comp_date: null | string;
    completed: number;
    created: string;
    description: string;
    logged_time: null | number;
    notes: null | string;
    reported_by: string;
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
        if (props.currentFacility !== 0) {
            reload();
        }
    }, [props.currentFacility]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const jobsList = await axios.get(`${SERVER_URL}/jobs/all-jobs/${props.currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useJobs/getHandler', [['response', jobsList]]);
            setJobs(jobsList.data);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useJobs/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { jobs, loading, error, reload };
};
