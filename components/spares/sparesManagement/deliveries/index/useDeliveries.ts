import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../routing/addressAPI';

interface Props {
    currentProperty: number;
}

interface Contents {
    delivery_id: number;
    spare_id: number;
    quantity: number;
    part_no: string;
    name: string;
}

interface Delivery {
    id: number;
    name: string;
    supplier: string;
    courier: string;
    placed: string;
    due: string;
    arrived: number;
    contents: Contents[];
}

export const useDeliveries = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [deliveriesList, setDeliveriesList] = useState<Delivery[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/spares/deliveries/${props.currentProperty}/0`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setDeliveriesList(response.data.deliveries);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { deliveriesList, loading, error, reload };
};
