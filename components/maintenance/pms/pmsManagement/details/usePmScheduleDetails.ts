import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../utility/routing/addressAPI';
import axios from 'axios';
import { GlobalDebug } from '../../../../utility/debug/globalDebug';

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

interface PMs {
    id: number;
    notes: string;
    created: string;
    required_comp_date: string;
    completed: number;
    comp_date: string;
    logged_time: number;
    status: string;
}

export const usePmScheduleDetails = (facilityId: number, scheduleId: number) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [scheduleDetails, setScheduleDetails] = useState<Schedule>();
    const [pms, setPms] = useState<PMs[]>([]);

    useEffect(() => {
        if (facilityId !== 0 && scheduleId !== 0) {
            reload();
        }
    }, [facilityId, scheduleId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getScheduleHandler();
    };

    const getScheduleHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/maintenance/pms/schedules/${facilityId}/${scheduleId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('usePmScheduleDetails/getScheduleHandler', [['response', response]]);
            if (response.data.scheduleDetails.length === 0) {
                setNoData(true);
            } else {
                setScheduleDetails(response.data.scheduleDetails[0]);
                setPms(response.data.schedulePMs);
            }
            setLoading(false);
        } catch (err) {
            GlobalDebug('usePmScheduleDetails/getScheduleHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { scheduleDetails, pms, loading, noData, error, reload };
};
