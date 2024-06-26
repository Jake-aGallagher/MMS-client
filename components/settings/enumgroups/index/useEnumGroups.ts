import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

interface EnumGroup {
    id: number;
    value: string;
}

export const useEnumGroups = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [enumGroups, setEnumGroups] = useState<EnumGroup[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const enumsList = await axios.get(`${SERVER_URL}/enumgroups`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useEnumGroups/getHandler', [['response', enumsList]]);
            setEnumGroups(enumsList.data.enumGroups);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useEnumGroups/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { enumGroups, loading, error, reload };
};
