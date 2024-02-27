import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface Base {
    thisMonth: number;
    mainData: {label: string; value: number}[]
}

interface RaisedCompleted extends Base {
    avgData: {value: number; flipped: boolean};
}

export const useDashboardJobs = (propertyId: number) => {
    const baseEmpty: Base = {
        thisMonth: 0,
        mainData: []
    }
    const empty: RaisedCompleted = {
        thisMonth: 0,
        avgData: {value: 0, flipped: false},
        mainData: []
    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [raised, setRaised] = useState<RaisedCompleted>(empty);
    const [completed, setCompleted] = useState<RaisedCompleted>(empty);
    const [open, setOpen] = useState<Base>(baseEmpty);
    const [planned, setPlanned] = useState(baseEmpty);

    useEffect(() => {
        reload();
    }, [propertyId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/dashboard/jobs/${propertyId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setRaised(response.data.raised);
            setCompleted(response.data.completed);
            setOpen(response.data.open);
            setPlanned(response.data.breakdownVsPlanned);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { raised, completed, open, planned, jobLoading: loading, jobError: error };
};
