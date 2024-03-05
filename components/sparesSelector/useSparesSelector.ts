import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { GlobalDebug } from '../debug/globalDebug';

interface Spare {
    id: number;
    part_no: string;
    name: string;
}

interface SparesSelected extends Spare {
    quantity: number;
}

export const useSparesSelector = (sparesSelected: SparesSelected[]) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [spareslist, setSparesList] = useState<SparesSelected[]>([]);

    useEffect(() => {
        if (currentProperty !== 0) {
            getHandler();
        }
    }, [currentProperty]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares-for-use/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useSparesSelector/getHandler', [['response', response]]);
            mergeArrays(response.data.spares);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useSparesSelector/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    const mergeArrays = (fullSparesList: Spare[]) => {
        const idListInUse: { [key: number]: true | undefined } = {};
        const mergedList: SparesSelected[] = [];

        sparesSelected.forEach((item) => {
            idListInUse[item.id] = true;
        });
        fullSparesList.forEach((item) => {
            if (idListInUse[item.id] == undefined) {
                mergedList.push({ ...item, quantity: 0 });
            }
        });
        setSparesList(mergedList);
        setLoading(false);
    };

    return { spareslist, loading, error };
};
