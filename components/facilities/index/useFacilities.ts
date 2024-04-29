import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { GlobalDebug } from '../../debug/globalDebug';

interface Facility {
    id: number;
    name: string;
    type: string;
    address: string;
    city: string;
    county: string;
    postcode: string;
}

export const useFacilities = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [allFacilities, setAllFacilities] = useState<Facility[]>([]);

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
            const facilitiesList = await axios.get(`${SERVER_URL}/facilities/all-facilities`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useFacilities/getHandler', [['response', facilitiesList]]);
            setAllFacilities(facilitiesList.data);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useFacilities/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { allFacilities, loading, error, reload };
};
