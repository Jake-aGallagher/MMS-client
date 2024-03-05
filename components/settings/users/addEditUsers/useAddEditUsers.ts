import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import { GlobalDebug } from '../../../debug/globalDebug';

interface UserGroup {
    id: number;
    name: string
}

export const useAddEditUsers = (id: number, user_group_id: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [userGroups, setUserGroups] = useState<UserGroup[]>();
    const [defaultValues, setDefaultValues] = useState({
        user_group_id: 0,
        username: '',
        first: '',
        last: '',
        password: '',
        retyped: '',
    });

    useEffect(() => {
        if (id > 0) {
            getHandlerFull();
        } else {
            getHandlerUserGroups()
        }
    }, []);

    const getHandlerFull = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/users/byuserid/${id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const data = response.data.users[0];
            setUserGroups(response.data.userGroups);
            setDefaultValues({
                user_group_id: data.user_group_id,
                username: data.username,
                first: data.first,
                last: data.last,
                password: 'HiddenPassword1',
                retyped: 'HiddenPassword1',
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditUsers/getHandlerFull', [
                ['error', err],
            ]);
            setError(true);
            setLoading(false);
        }
    };

    const getHandlerUserGroups = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/usergroups/all`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setUserGroups(response.data.userGroups);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditUsers/getHandlerUserGroups', [
                ['error', err],
            ]);
            setError(true);
            setLoading(false);
        }
    };

    return { defaultValues, userGroups, loading, error };
};
