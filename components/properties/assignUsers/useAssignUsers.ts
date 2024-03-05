import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { GlobalDebug } from '../../debug/globalDebug';

interface Props {
    propertyNumber: number;
}

interface UsersList {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    user_group_id: number;
    assigned: boolean;
}

export const useAssignUsers = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [users, setUsers] = useState<UsersList[]>([]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getUsersForAssign();
    }, []);

    const getUsersForAssign = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/properties/users-for-assigning/${props.propertyNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAssignUsers/getUsersForAssign', [['response', response]]);
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setUsers(response.data);
            }
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAssignUsers/getUsersForAssign', [
                ['error', err],
            ]);
            setError(true);
            setLoading(false);
        }
    };
    return { users, loading, noData, error };
};
