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
            const response = await axios.get(`${SERVER_URL}/logs/edit-log-field/${fieldId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setDefaultValues({
                type: response.data.logField.type,
                name: response.data.logField.name,
                required: response.data.logField.required ? 'Yes' : 'No',
                order: response.data.logField.sort_order,
                guidance: response.data.logField.guidance,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};