import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import axios from 'axios';
import { GlobalDebug } from '../../../debug/globalDebug';

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

interface Logs {
    id: number;
    created: string;
    required_comp_date: string;
    completed: number;
    comp_date: string;
}

export const useLogTemplateDetails = (propertyId: number, scheduleId: number) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [templateDetails, setTemplateDetails] = useState<LogTemplate>();
    const [logs, setLogs] = useState<Logs[]>([]);

    useEffect(() => {
        if (propertyId !== 0 && scheduleId !== 0) {
            reload();
        }
    }, [propertyId, scheduleId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getScheduleHandler();
    };

    const getScheduleHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/logs/log-templates/${propertyId}/${scheduleId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useLogTemplateDetails/getScheduleHandler', [['response', response]]);
            if (response.data.logTemplate.length === 0) {
                setNoData(true);
            } else {
                setTemplateDetails(response.data.logTemplate);
                setLogs(response.data.logs);
            }
            setLoading(false);
        } catch (err) {
            GlobalDebug('useLogTemplateDetails/getScheduleHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { templateDetails, logs, loading, noData, error, reload };
};
