import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { GlobalDebug } from '../debug/globalDebug';

interface UserFound {
    id: number;
    first_name: string;
    last_name: string;
}

interface UserSelected {
    id: number;
    name: string;
    time: number;
}

export const useUsersSelector = (usersSelected: UserSelected[]) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const [userslist, setUsersList] = useState<UserSelected[]>([]);

    useEffect(() => {
        if (currentFacility !== 0) {
            getHandler();
        }
    }, [currentFacility]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/users/all/${currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useUsersSelector/getHandler', [['response', response]]);
            mergeArrays(response.data.users);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useUsersSelector/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    const mergeArrays = (fullUsersList: UserFound[]) => {
        const idListInUse: { [key: number]: true | undefined } = {};
        const mergedList: UserSelected[] = [];

        usersSelected.forEach((user) => {
            idListInUse[user.id] = true;
        });
        fullUsersList.forEach((user) => {
            if (idListInUse[user.id] == undefined) {
                mergedList.push({ id: user.id, name: user.first_name + ' ' + user.last_name, time: 0 });
            }
        });
        setUsersList(mergedList);
        setLoading(false);
    };

    return { userslist, loading, error };
};
