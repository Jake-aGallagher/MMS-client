import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { GlobalDebug } from '../../debug/globalDebug';

interface Props {
    currentFacility: number;
}

interface Asset {
    id: number;
    name: string;
    revenue: number;
}

export const useRevenue = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [assets, setAssets] = useState<Asset[]>([]);

    useEffect(() => {
        if (props.currentFacility !== 0) {
            reload();
        }
    }, [props.currentFacility]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/revenue/${props.currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useRevenue/getHandler', [['response', response]]);
            setAssets(response.data.assets);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useRevenue/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { assets, loading, error, reload };
};
