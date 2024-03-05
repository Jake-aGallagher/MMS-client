import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../routing/addressAPI';
import { GlobalDebug } from '../debug/globalDebug';

interface Props {
    currentProperty: number;
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
        if (props.currentProperty !== 0) {
            reload();
        }
    }, [props.currentProperty]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/logs/all-logs/${props.currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setLogs(response.data.logs);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useLogs/getHandler', [
                ['error', err],
            ]);
            setError(true);
            setLoading(false);
        }
    };
    return { logs, loading, error, reload };
};
