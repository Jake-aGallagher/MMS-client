import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import axios from 'axios';

interface LogTemplate {
    id: number;
    title: string;
    description: string;
    frequency: string;
}

/* last_comp_date: string;
next_due_date: string;
up_to_date: number; */

export const useLogTemplateDetails = (propertyId: number, scheduleId: number) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [templateDetails, setTemplateDetails] = useState<LogTemplate>();

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
            const response = await axios.get(`${SERVER_URL}/logs/log-templates/${propertyId}/${scheduleId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            console.log(response.data.logTemplate)
            if (response.data.logTemplate.length === 0) {
                setNoData(true);
            } else {
                setTemplateDetails(response.data.logTemplate);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { templateDetails, loading, noData, error, reload };
};
