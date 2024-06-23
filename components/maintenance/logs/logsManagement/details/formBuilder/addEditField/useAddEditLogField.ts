import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../../../../utility/debug/globalDebug';

export const useAddEditLogField = (fieldId: number) => {
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
            GlobalDebug('useAddEditLogField/getHandlerOnlyEnums', [['response', response]]);
            setEnumOptions(response.data.enumGroups);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditLogField/getHandlerOnlyEnums', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/maintenance/logs/edit-log-field/${fieldId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditLogField/getHandler', [['response', response]]);
            setDefaultValues({
                type: response.data.logField.type,
                options: response.data.logField.options,
                name: response.data.logField.name,
                required: response.data.logField.required ? 'Yes' : 'No',
                order: response.data.logField.sort_order,
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditLogField/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, enumOptions, loading, error };
};
