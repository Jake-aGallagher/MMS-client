import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../../routing/addressAPI';
import axios from 'axios';

export interface LogTemplateFields {
    id: number;
    type: string;
    name: string;
    required: boolean;
    guidance: string;
    sort_order: number;
}

export const useLogFields = (templateId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [logFields, setLogFields] = useState<LogTemplateFields[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        getScheduleHandler();
    };

    const getScheduleHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/logs/log-fields/${templateId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setLogFields(response.data.logFields);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { logFields, loading, error, reload };
};
