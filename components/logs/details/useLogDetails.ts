import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface Props {
    logId: number;
}

interface Log {
    id: number;
    title: string;
    description: string;
    created: string;
    required_comp_date: string;
    completed: number;
    comp_date: string;
    frequency: string;
}

interface LogField {
    id: number;
    type: string;
    name: string;
    value: string;
}

export const useLogDetails = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [log, setLog] = useState<Log>();
    const [logFields, setLogFields] = useState<LogField[]>([]);

    useEffect(() => {
        reload();
    }, [props.logId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/logs/log/${props.logId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setLog(response.data.log);
            setLogFields(response.data.fields);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { log, logFields, loading, error, reload };
};
