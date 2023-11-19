import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';

interface UrgencyType {
    id: number;
    value: string;
    can_complete: 1 | 0;
    list_priority: number;
}


export const useUrgencyTypes = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [urgencyTypes, setUrgencyTypes] = useState<UrgencyType[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/urgencytypes`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setUrgencyTypes(response.data.urgencyTypes);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { urgencyTypes, loading, error, reload };
};