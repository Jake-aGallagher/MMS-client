import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface TypeOptions {
    id: number;
    value: string;
}

interface UrgencyOptions {
    id: number;
    value: string;
}

export const useCreateJob = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [typeOptions, setTypeOptions] = useState<TypeOptions[]>([]);
    const [urgencyOptions, setUrgencyOptions] = useState<UrgencyOptions[]>([]);
    const [defaultValues, setDefaultValues] = useState({
        breakdownOrSchedule: 'Breakdown',
        selectedType: '',
        title: '',
        description: '',
        selectedUrgency: '',
        compNow: 'No',
        startNow: 'No',
        scheduleStart: '',
        intervalFrequency: 1,
        intervalTimeUnit: 'WEEK',
    });

    useEffect(() => {
        setLoading(true);
        setError(false);
        getEnums();
    }, []);

    const getEnums = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/jobs/create-job`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setTypeOptions(response.data.types);
            setUrgencyOptions(response.data.urgency);
            setDefaultValues({
                ...defaultValues,
                selectedType: response.data.types[0].id,
                selectedUrgency: response.data.urgency[0].id,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, typeOptions, urgencyOptions, loading, error };
};
