import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface RaisedCompleted {
    thisMonth: number;
    mainData: {label: string; value: number}[]
    avgData: {value: number; flipped: boolean};
}

export const useDashboardSpares = (propertyId: number) => {
    const empty: RaisedCompleted = {
        thisMonth: 0,
        avgData: {value: 0, flipped: false},
        mainData: []
    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sparesCost, setSparesCosts] = useState<RaisedCompleted>(empty);

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
            const response = await axios.get(`${SERVER_URL}/dashboard/spares/${propertyId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setSparesCosts(response.data.sparesCost);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { sparesCost, sparesLoading: loading, sparesError: error };
};
