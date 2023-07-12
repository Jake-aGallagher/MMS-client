import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface Property {
    id: number;
    name: string;
    type: string;
    address: string;
    city: string;
    county: string;
    postcode: string;
}

export const useProperties = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [allProperties, setAllProperties] = useState<Property[]>([]);

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
            const propertiesList = await axios.get(`${SERVER_URL}/properties/all-properties`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setAllProperties(propertiesList.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { allProperties, loading, error, reload };
};
