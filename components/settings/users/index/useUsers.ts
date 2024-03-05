import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import { GlobalDebug } from '../../../debug/globalDebug';

interface User {
    id: number;
}

export const useUsers = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState<User[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/all-users`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setUsers(response.data.users);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useUsers/getHandler', [
                ['error', err],
            ]);
            setError(true);
            setLoading(false);
        }
    };
    return { users, loading, error, reload };
};
