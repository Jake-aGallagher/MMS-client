import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import axios from 'axios';

interface SchedulePM {
    id: number;
    template_id: number;
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

export const useSchedulePMDetails = (PMId: string) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [schedulePMDetails, setSchedulePMDetails] = useState<SchedulePM>();
    const [timeDetails, setTimeDetails] = useState<TimeDetails[]>([]);
    const [sparesDetails, setSparesDetails] = useState<UsedSpares[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getScheduleHandler();
    };

    const getScheduleHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/pms/${PMId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.schedulePMDetails.length === 0) {
                setNoData(true);
            } else {
                setSchedulePMDetails(response.data.schedulePMDetails[0]);
                setTimeDetails(response.data.timeDetails || []);
                setSparesDetails(response.data.usedSpares || []);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { schedulePMDetails, timeDetails, sparesDetails, loading, noData, error, reload };
};
