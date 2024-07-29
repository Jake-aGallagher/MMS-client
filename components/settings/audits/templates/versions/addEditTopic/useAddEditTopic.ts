import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../../../utility/debug/globalDebug';

export const useAddEditTopic = (topicId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        title: '',
        sortOrder: 10,
    });

    useEffect(() => {
        if (topicId > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/audit/topic/${topicId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditTopic/getHandler', [['response', response]]);
            const data = response.data.topic;
            setDefaultValues({
                title: data.title,
                sortOrder: data.sort_order,
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditTopic/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};
