import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import { GlobalDebug } from '../../../debug/globalDebug';

export const useAddEditFields = (fieldId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [enumOptions, setEnumOptions] = useState<{ id: string; value: string }[]>([]);
    const [defaultValues, setDefaultValues] = useState({
        type: 'text',
        options: '',
        name: '',
        required: 'No',
        order: 10,
    });

    useEffect(() => {
        if (fieldId === 0) {
            getHandlerOnlyEnums();
            return;
        }
        setLoading(true);
        setError(false);
        getHandler();
    }, []);

    const getHandlerOnlyEnums = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/enumgroups`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditFields/getHandlerOnlyEnums', [['response', response]]);
            setEnumOptions(response.data.enumGroups);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditFields/getHandlerOnlyEnums', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/field/${fieldId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditFields/getHandler', [['response', response]]);
            setDefaultValues({
                type: response.data.field.type,
                options: response.data.field.enum_group_id,
                name: response.data.field.name,
                required: response.data.field.required ? 'Yes' : 'No',
                order: response.data.field.sort_order,
            });
            setEnumOptions(response.data.enums);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditFields/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, enumOptions, loading, error };
};
