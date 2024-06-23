import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../routing/addressAPI';
import { GlobalDebug } from '../../../../debug/globalDebug';

interface LogTemplateDefaultValues {
    title: string;
    description: string;
    startNow?: string;
    scheduleStart?: string;
    frequencyTime: number;
    frequencyUnit: string;
}

export const useAddEditLogTemplate = (logTemplateId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        title: '',
        description: '',
        startNow: 'No',
        scheduleStart: '',
        frequencyTime: 1,
        frequencyUnit: 'WEEK',
    });

    useEffect(() => {
        if (logTemplateId === 0) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(false);
        getHandler();
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/logs/edit-log-template/${logTemplateId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditLogTemplate/getHandler', [['response', response]]);
            setDefaultValues({
                ...defaultValues,
                title: response.data.logTemplate.title,
                description: response.data.logTemplate.description,
                frequencyTime: response.data.logTemplate.frequency_time,
                frequencyUnit: response.data.logTemplate.frequency_unit,
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditLogTemplate/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};
