import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { CustomFieldData, DefaultValues, FieldValue } from '../../../commonTypes/CustomFields';

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
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
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
            setTypeOptions(response.data.types);
            setUrgencyOptions(response.data.urgency);
            setCustomFields(response.data.customFields);
            const defaultVal: DefaultValues = {
                ...defaultValues,
                selectedType: response.data.types[0].id,
                selectedUrgency: response.data.urgency[0].id,
            };
            response.data.customFields.fields.forEach((field: FieldValue) => {
                defaultVal[field.id] = field.value;
            });
            setDefaultValues(defaultVal);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, customFields, typeOptions, urgencyOptions, loading, error };
};
