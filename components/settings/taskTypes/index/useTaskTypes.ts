import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

interface TaskType {
    id: number;
    value: string;
    list_priority: number;
}

export const useTaskTypes = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [taskTypes, setTaskTypes] = useState<TaskType[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/maintenance/tasktypes`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useTaskTypes/getHandler', [['response', response]]);
            setTaskTypes(response.data.taskTypes);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useTaskTypes/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { taskTypes, loading, error, reload };
};
