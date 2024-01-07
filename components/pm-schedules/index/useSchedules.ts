import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface Props {
    currentProperty: number;
}

interface Schedule {
    id: number;
    asset: string;
    type: string;
    title: string;
    frequency: string;
    next_due_date: string;
    up_to_date: number;
}

export const useSchedules = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    useEffect(() => {
        reload();
    }, [props.currentProperty]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const schedulesList = await axios.get(`${SERVER_URL}/schedule-templates/all-schedules/${props.currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setSchedules(schedulesList.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { schedules, loading, error, reload };
};
