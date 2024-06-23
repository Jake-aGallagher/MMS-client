import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

interface BaseData {
    mainData: { label: string; value: number }[];
}

interface Data extends BaseData {
    thisMonth: number;
    mainData: { label: string; value: number }[];
    avgData: { value: number; flipped: boolean };
}

export const useDashboardRevenues = (facilityId: number) => {
    const emptyBase: BaseData = { mainData: [] };
    const empty: Data = {
        thisMonth: 0,
        avgData: { value: 0, flipped: false },
        mainData: [],
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [revenue, setRevenue] = useState<Data>(empty);
    const [downtime, setDowntime] = useState<Data>(empty);
    const [assetRevenue, setAssetRevenue] = useState<BaseData>(emptyBase);

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
            const response = await axios.get(`${SERVER_URL}/dashboard/revenue/${facilityId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useDashboardRevenues/getHandler', [['response', response]]);
            setRevenue(response.data.revenue);
            setDowntime(response.data.downtime);
            setAssetRevenue(response.data.assetRevenue);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useDashboardRevenues/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { revenue, downtime, assetRevenue, revenuesLoading: loading, revenuesError: error };
};
