import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import { GlobalDebug } from '../../../debug/globalDebug';

interface TypeOptions {
    id: number;
    value: string;
}

export const useAddSchedule = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [typeOptions, setTypeOptions] = useState<TypeOptions[]>([]);
    const [defaultValues, setDefaultValues] = useState({
        type: '',
        title: '',
        description: '',
        startNow: 'No',
        scheduleStart: '',
        frequencyTime: 1,
        frequencyUnit: 'WEEK',
    });

    useEffect(() => {
        setLoading(true);
        setError(false);
        getEnums();
    }, []);

    const getEnums = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/pms/schedules/add-schedule`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddSchedule/getEnums', [['response', response]]);

            setTypeOptions(response.data.types);
            setDefaultValues({
                ...defaultValues,
                type: response.data.types[0].id,
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddSchedule/getEnums', [
                ['error', err],
            ]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, typeOptions, loading, error };
};