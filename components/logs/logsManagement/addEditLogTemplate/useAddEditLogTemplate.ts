import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';

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
            setDefaultValues({
                title: response.data.title,
                description: response.data.description,
                startNow: response.data.startNow,
                scheduleStart: response.data.scheduleStart,
                frequencyTime: response.data.frequencyTime,
                frequencyUnit: response.data.frequencyUnit,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};