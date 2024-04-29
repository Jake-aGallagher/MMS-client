import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { GlobalDebug } from '../../debug/globalDebug';

interface BaseData {
    thisMonth: number;
    mainData: { label: string; value: number }[];
    avgData: { value: number; flipped: boolean };
}

export const useDashboardSpares = (facilityId: number) => {
    const empty: BaseData = {
        thisMonth: 0,
        avgData: { value: 0, flipped: false },
        mainData: [],
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sparesCost, setSparesCosts] = useState<BaseData>(empty);
    const [missingSpares, setMissingSpares] = useState<BaseData>(empty);

    useEffect(() => {
        if (facilityId > 0) {
            reload();
        }
    }, [facilityId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/dashboard/spares/${facilityId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useDashboardSpares/getHandler', [['response', response]]);
            setSparesCosts(response.data.sparesCost);
            setMissingSpares(response.data.missingSpares);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useDashboardSpares/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { sparesCost, missingSpares, sparesLoading: loading, sparesError: error };
};
