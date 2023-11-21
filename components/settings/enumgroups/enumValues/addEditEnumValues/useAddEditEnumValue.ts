import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../routing/addressAPI';

interface Props {
    id: number;
}

export const useAddEditEnumValues = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        order: 10,
    });

    useEffect(() => {
        if (props.id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/enumvalue/${props.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setDefaultValues({
                name: response.data.enums[0].value,
                order: response.data.enums[0].list_priority,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    return { defaultValues, loading, error };
};
