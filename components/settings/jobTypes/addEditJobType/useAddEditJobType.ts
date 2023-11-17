import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';

interface Props {
    jobTypeNumber: number;
}

export const useAddEditJobType = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        value: '',
        listPriority: 10,
    });

    useEffect(() => {
        if (props.jobTypeNumber > 0) {
            setLoading(true);
            setError(false);
            getJobTypeHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getJobTypeHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/jobtypes/${props.jobTypeNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const data = response.data.jobType[0];
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
