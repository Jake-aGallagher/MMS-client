import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';

interface StatusType {
    id: number;
    value: string;
    can_complete: 1 | 0;
    list_priority: number;
}


export const useStatusTypes = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [statusTypes, setStatusTypes] = useState<StatusType[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/statustypes`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setStatusTypes(response.data.statusTypes);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { statusTypes, loading, error, reload };
};