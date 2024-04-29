import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { GlobalDebug } from '../../debug/globalDebug';

interface Props {
    currentFacility: number;
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

export const usePmSchedules = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [schedules, setSchedules] = useState<Schedule[]>([]);

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
            const schedulesList = await axios.get(`${SERVER_URL}/pms/schedules/all-schedules/${props.currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('usePmSchedules/getUpdate', [['response', schedulesList]]);
            setSchedules(schedulesList.data);
            setLoading(false);
        } catch (err) {
            GlobalDebug('usePmSchedules/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { schedules, loading, error, reload };
};
