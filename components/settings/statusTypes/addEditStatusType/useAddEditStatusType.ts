import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';

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
            const response = await axios.get(`${SERVER_URL}/statustypes/${props.statusTypeNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const data = response.data.statusType[0];
            setDefaultValues({
                value: data.value,
                canComplete: data.can_complete,
                listPriority: data.list_priority,
                initialStatus: data.initial_status == 1,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};
