import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import axios from 'axios';

interface Schedule {
    id: number;
    asset: string;
    type: string;
    title: string;
    description: string;
    frequency: string;
    last_comp_date: string;
    next_due_date: string;
    up_to_date: number;
}

interface SchedulePMs {
    id: number;
    notes: string;
    created: string;
    required_comp_date: string;
    completed: number;
    comp_date: string;
    logged_time: number;
    status: string;
}

export const useScheduleDetails = (propertyId: number, scheduleId: string) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [scheduleDetails, setScheduleDetails] = useState<Schedule>();
    const [schedulePMs, setSchedulePMs] = useState<SchedulePMs[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/pm-schedules/${propertyId}/${scheduleId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.scheduleDetails.length === 0) {
                setNoData(true);
            } else {
                setScheduleDetails(response.data.scheduleDetails[0]);
                setSchedulePMs(response.data.schedulePMs);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { scheduleDetails, schedulePMs, loading, noData, error, reload };
};
