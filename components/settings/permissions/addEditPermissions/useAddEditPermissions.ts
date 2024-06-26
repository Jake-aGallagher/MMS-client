import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

interface Props {
    id: number;
}

interface PermissionsList {
    id: number;
    area: string;
    permission: string;
    full_string: string;
    selected: boolean;
}

export const useAddEditPermissions = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [permissionsList, setPermissionsList] = useState<PermissionsList[]>([]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        getPermissionsForGroup();
    }, []);

    const getPermissionsForGroup = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/permissions/group/${props.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditPermissions/getPermissionsForGroup', [['response', response]]);
            setPermissionsList(response.data.permissionsList);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditPermissions/getPermissionsForGroup', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { permissionsList, loading, error };
};
