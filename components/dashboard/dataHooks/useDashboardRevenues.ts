import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { GlobalDebug } from '../../debug/globalDebug';

interface BaseData {
    thisMonth: number;
    mainData: { label: string; value: number }[];
    avgData: { value: number; flipped: boolean };
}

export const useDashboardRevenues = (propertyId: number) => {
    const empty: BaseData = {
        thisMonth: 0,
        avgData: { value: 0, flipped: false },
        mainData: [],
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [downtime, setDowntime] = useState<BaseData>(empty);

    useEffect(() => {
        if (propertyId > 0) {
            reload();
        }
    }, [propertyId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/dashboard/revenue/${propertyId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useDashboardRevenues/getHandler', [['response', response]]);
            setDowntime(response.data.downtime);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useDashboardRevenues/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { downtime, revenuesLoading: loading, revenuesError: error };
};
