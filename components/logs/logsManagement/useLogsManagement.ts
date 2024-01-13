import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface LogTemplate {
    id: number;
    title: string;
    description: string;
    created: string;
    frequency: string;
}

export const useLogTemplates = (currentProperty: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [logTemplates, setLogTemplates] = useState<LogTemplate[]>([]);

    useEffect(() => {
        reload();
    }, [currentProperty]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const logTemplates = await axios.get(`${SERVER_URL}/logs/all-log-templates/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setLogTemplates(logTemplates.data.logTemplates);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { logTemplates, loading, error, reload };
};
