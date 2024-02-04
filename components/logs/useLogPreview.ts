import { useEffect, useState } from 'react';
import { SERVER_URL } from '../routing/addressAPI';
import axios from 'axios';

export interface LogTemplateFields {
    id: number;
    type: string;
    enumGroupId?: number;
    name: string;
    required: boolean;
    guidance: string;
    sort_order: number;
}

export const useLogPreview = (templateId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [logTitle, setLogTitle] = useState('');
    const [logFields, setLogFields] = useState<LogTemplateFields[]>([]);
    const [enumGroups, setEnumGroups] = useState<{[key: string]:{ id: string; value: string }[]}>({});

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
            const response = await axios.get(`${SERVER_URL}/logs/log-fields-preview/${templateId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setLogFields(response.data.logFields);
            setLogTitle(response.data.logTitle);
            setEnumGroups(response.data.enumGroups);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { logFields, enumGroups, logTitle, loading, error, reload };
};
