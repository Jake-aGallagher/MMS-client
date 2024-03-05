import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import { GlobalDebug } from '../../../debug/globalDebug';

interface Props {
    urgencyTypeNumber: number;
}

export const useAddEditUrgencyType = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        value: '',
        urgencyNumber: 0,
        urgencyPeriod: 'DAY',
        listPriority: 10,
    });

    useEffect(() => {
        if (props.urgencyTypeNumber > 0) {
            setLoading(true);
            setError(false);
            getUrgencyTypeHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getUrgencyTypeHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/urgencytypes/${props.urgencyTypeNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditUrgencyType/getUrgencyTypeHandler', [['response', response]]);
            const data = response.data.urgencyType[0];
            setDefaultValues({
                value: data.value,
                urgencyNumber: data.urgency_number,
                urgencyPeriod: data.urgency_period,
                listPriority: data.list_priority,
                
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditUrgencyType/getUrgencyTypeHandler', [
                ['error', err],
            ]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};
