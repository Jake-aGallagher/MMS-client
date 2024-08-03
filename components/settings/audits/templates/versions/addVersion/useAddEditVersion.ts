import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../../../utility/debug/globalDebug';

export const useAddEditVersion = (templateId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        title: '',
    });

    useEffect(() => {
        setLoading(true);
        setError(false);
        getHandler();
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/audit/template/${templateId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditVersion/getHandler', [['response', response]]);
            setDefaultValues({
                title: response.data.template.title,
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditVersion/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};
