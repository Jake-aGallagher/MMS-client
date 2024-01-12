import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';

interface Props {
    taskTypeNumber: number;
}

export const useAddEditTaskType = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        value: '',
        listPriority: 10,
    });

    useEffect(() => {
        if (props.taskTypeNumber > 0) {
            setLoading(true);
            setError(false);
            getTaskTypeHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getTaskTypeHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/tasktypes/${props.taskTypeNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const data = response.data.taskType[0];
            setDefaultValues({
                value: data.value,
                listPriority: data.list_priority,
                
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};
