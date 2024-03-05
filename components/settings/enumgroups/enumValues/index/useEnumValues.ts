import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../routing/addressAPI';

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
            setEnumValues(enumsList.data.enums);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { enumValues, loading, error, reload };
};
