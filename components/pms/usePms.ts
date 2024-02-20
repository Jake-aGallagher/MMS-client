import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../routing/addressAPI';

interface Props {
    currentProperty: number;
}

interface PM {
    id: number;
    title: string;
    type: string;
    created: string;
    required_comp_date: string;
    status: string;
    frequency: string;
}

export const usePms = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [pms, setPms] = useState<PM[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/pms/${props.currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setPms(response.data.pms);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { pms, loading, error, reload };
};
