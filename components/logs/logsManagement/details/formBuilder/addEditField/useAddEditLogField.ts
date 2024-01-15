import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../../routing/addressAPI';

export const useAddEditLogField = (fieldId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        type: 'text',
        name: '',
        required: 'No',
        order: 10,
        guidance: '',
    });

    useEffect(() => {
        if (fieldId === 0) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(false);
        getHandler();
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/logs/edit-log-template/${fieldId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setDefaultValues({
                ...defaultValues,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};