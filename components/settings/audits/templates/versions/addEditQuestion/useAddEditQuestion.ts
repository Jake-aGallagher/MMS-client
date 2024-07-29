import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../../../utility/debug/globalDebug';

export const useAddEditQuestion = (questionId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        questionType: 'text',
        title: '',
        sortOrder: 10,
    });

    useEffect(() => {
        if (questionId > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/audit/question/${questionId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditQuestion/getHandler', [['response', response]]);
            const data = response.data.question;
            setDefaultValues({
                questionType: data.question_type,
                title: data.title,
                sortOrder: data.sort_order,
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditQuestion/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};
