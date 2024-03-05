import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import { GlobalDebug } from '../../../debug/globalDebug';

interface User {
    id: number;
    name: string;
}

export const useUserGroups = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [userGroups, setUserGroups] = useState<User[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/usergroups/all`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useUserGroups/getHandler', [['response', response]]);
            setUserGroups(response.data.userGroups);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useUserGroups/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { userGroups, loading, error, reload };
};
