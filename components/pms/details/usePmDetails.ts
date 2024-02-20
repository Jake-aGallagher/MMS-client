import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import axios from 'axios';

interface PM {
    id: number;
    schedule_id: number;
    title: string;
    asset: string;
    type: string;
    description: string;
    notes: string;
    created: string;
    required_comp_date: string;
    status: string;
    completed: number;
    comp_date: string;
    logged_time: number;
}

interface TimeDetails {
    id: number;
    time: number;
    first: string;
    last: string;
}

interface UsedSpares {
    id: number;
    quantity: number;
    part_no: string;
    name: string;
}

export const usePMDetails = (PMId: string) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [pmDetails, setPmDetails] = useState<PM>();
    const [timeDetails, setTimeDetails] = useState<TimeDetails[]>([]);
    const [sparesDetails, setSparesDetails] = useState<UsedSpares[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/pms/pm/${PMId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.pm.length === 0) {
                setNoData(true);
            } else {
                setPmDetails(response.data.pm[0]);
                setTimeDetails(response.data.timeDetails || []);
                setSparesDetails(response.data.usedSpares || []);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { pmDetails, timeDetails, sparesDetails, loading, noData, error, reload };
};
