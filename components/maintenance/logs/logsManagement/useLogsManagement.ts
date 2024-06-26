import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

interface LogTemplate {
    id: number;
    title: string;
    description: string;
    created: string;
    frequency: string;
    last_comp_date: string;
    next_due_date: string;
    up_to_date: number;
}

export const useLogTemplates = (currentFacility: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [logTemplates, setLogTemplates] = useState<LogTemplate[]>([]);

    useEffect(() => {
        if (currentFacility !== 0) {
            reload();
        }
    }, [currentFacility]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const logTemplates = await axios.get(`${SERVER_URL}/maintenance/logs/all-log-templates/${currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useLogTemplates/getHandler', [['response', logTemplates]]);
            setLogTemplates(logTemplates.data.logTemplates);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useLogTemplates/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { logTemplates, loading, error, reload };
};
