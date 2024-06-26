import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

interface Props {
    id: number;
}

export const useAddEditEnumGroups = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        name: '',
    });

    useEffect(() => {
        if (props.id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/enumgroup/${props.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditEnumGroups/getHandler', [['response', response]]);
            setDefaultValues({
                name: response.data.enumGroup[0].value,
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditEnumGroups/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    return { defaultValues, loading, error };
};
