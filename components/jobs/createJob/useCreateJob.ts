import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { CustomFieldData, DefaultValues, FieldValue } from '../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../debug/globalDebug';

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
    const [defaultValues, setDefaultValues] = useState<DefaultValues>({
        selectedType: '',
        title: '',
        description: '',
        selectedUrgency: '',
        compNow: 'No',
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
            GlobalDebug('useCreateJob/getEnums', [['response', response]]);
            setTypeOptions(response.data.types);
            setUrgencyOptions(response.data.urgency);
            setDefaultValues({
                ...defaultValues,
                selectedType: response.data.types[0].id,
                selectedUrgency: response.data.urgency[0].id,
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useCreateJob/getEnums', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, typeOptions, urgencyOptions, loading, error };
};
