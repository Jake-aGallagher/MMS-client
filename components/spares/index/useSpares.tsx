import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../utility/routing/addressAPI';
import { GlobalDebug } from '../../utility/debug/globalDebug';

interface Props {
    currentFacility: number;
}

interface Spare {
    id: number;
    part_no: string;
    man_part_no: string;
    name: string;
    man_name: string;
    description: string | null;
    notes: string | null;
    location: string;
    quant_remain: number;
    supplier: string;
    reorder_freq: string;
    reorder_num: number;
    running_low: number;
    avg_usage: number;
    cost: number;
}

export const useSpares = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [spares, setSpares] = useState<Spare[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/all-spares/${props.currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useSpares/getHandler', [['response', response]]);
            setSpares(response.data);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useSpares/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { spares, loading, error, reload };
};
