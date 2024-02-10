import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import axios from 'axios';

export interface Fields {
    id: number;
    type: string;
    enumGroupId?: number;
    name: string;
    required: boolean;
    guidance: string;
    sort_order: number;
}

export const useFieldList = (model: string) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fields, setFields] = useState<Fields[]>([]);
    const [enumGroups, setEnumGroups] = useState<{[key: string]:{ id: string; value: string }[]}>({});

    useEffect(() => {
        reload();
    }, [model]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getScheduleHandler();
    };

    const getScheduleHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/fields/${model}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setFields(response.data.fields);
            setEnumGroups(response.data.enumGroups);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { fields, enumGroups, loading, error, reload };
};
