import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../routing/addressAPI';
import { GlobalDebug } from '../../../../debug/globalDebug';

export const useAddEditSparesNote = (id: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({ title: '', note: '' });

    useEffect(() => {
        if (id > 0) {
            setError(false);
            setLoading(true);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares/note/${id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setDefaultValues({ title: response.data[0].title, note: response.data[0].content });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditSparesNote/getHandler', [
                ['error', err],
            ]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};
