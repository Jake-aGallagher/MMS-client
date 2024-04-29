import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../routing/addressAPI';
import { GlobalDebug } from '../debug/globalDebug';

interface Props {
    currentFacility: number;
}

interface Log {
    id: number;
    title: string;
    created: string;
    required_comp_date: string;
    completed: boolean;
    comp_date: string;
    frequency: string;
}

export const useLogs = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [logs, setLogs] = useState<Log[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/logs/all-logs/${props.currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useLogs/getHandler', [['response', response]]);
            setLogs(response.data.logs);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useLogs/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { logs, loading, error, reload };
};
