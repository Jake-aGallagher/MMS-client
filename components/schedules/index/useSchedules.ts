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
    required_comp_date: string;
    completed: number;
    comp_date: string;
    status: string;
    frequency: string;
}

export const useSchedules = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        getHandler();
    }, [props.currentProperty]);

    const getHandler = async () => {
        try {
            const schedulesList = await axios.get(`${SERVER_URL}/schedules/all-schedules/${props.currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            console.log(schedulesList.data);
            setSchedules(schedulesList.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { schedules, loading, error };
};
