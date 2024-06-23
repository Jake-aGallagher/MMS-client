import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import axios from 'axios';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

export interface Fields {
    id: number;
    type: string;
    enumGroupId?: number;
    name: string;
    required: boolean;
    guidance: string;
    sort_order: number;
}

export const useFieldList = (model: string, modelId?: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fields, setFields] = useState<Fields[]>([]);
    const [enumGroups, setEnumGroups] = useState<{ [key: string]: { id: string; value: string }[] }>({});

    useEffect(() => {
        if (model != '') {
            reload();
        }
    }, [model, modelId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getScheduleHandler();
    };

    const getScheduleHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/fields/${model}/${modelId ? modelId : 0}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useFieldList/getScheduleHandler', [['response', response]]);
            setFields(response.data.fields);
            setEnumGroups(response.data.enumGroups);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useFieldList/getScheduleHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { fields, enumGroups, loading, error, reload };
};
