import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../../utility/debug/globalDebug';

interface EnumValue {
    id: number;
    value: string;
    list_priority: number;
}

export const useEnumValues = (enumGroupId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [enumValues, setEnumValues] = useState<EnumValue[]>([]);

    useEffect(() => {
        if (enumGroupId !== 0) {
            reload();
        }
    }, [enumGroupId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const enumsList = await axios.get(`${SERVER_URL}/enumgroups/${enumGroupId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useEnumValues/getHandler', [['response', enumsList]]);
            setEnumValues(enumsList.data.enums);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useEnumValues/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { enumValues, loading, error, reload };
};
