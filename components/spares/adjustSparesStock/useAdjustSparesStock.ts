import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface Props {
    SpareId: number;
}

export const useAdjustSparesStock = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [spareStock, setSpareStock] = useState<number>(0);

    useEffect(() => {
        setLoading(true);
        setError(false);
        getHandler();
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares/instock/${props.SpareId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setSpareStock(response.data[0].quant_remain);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { spareStock, loading, error };
};
