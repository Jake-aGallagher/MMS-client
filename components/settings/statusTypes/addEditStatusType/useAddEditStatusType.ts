import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

interface Props {
    statusTypeNumber: number;
}

export const useAddEditStatusType = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        value: '',
        canComplete: 0,
        listPriority: 10,
        initialStatus: false,
    });

    useEffect(() => {
        if (props.statusTypeNumber > 0) {
            setLoading(true);
            setError(false);
            getStatusTypeHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getStatusTypeHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/maintenance/statustypes/${props.statusTypeNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditStatusType/getStatusTypeHandler', [['response', response]]);
            const data = response.data.statusType[0];
            setDefaultValues({
                value: data.value,
                canComplete: data.can_complete,
                listPriority: data.list_priority,
                initialStatus: data.initial_status == 1,
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditStatusType/getStatusTypeHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};
