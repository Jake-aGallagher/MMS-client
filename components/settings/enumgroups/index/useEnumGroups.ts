import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';

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
            setEnumGroups(enumsList.data.enumGroups);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { enumGroups, loading, error, reload };
};
