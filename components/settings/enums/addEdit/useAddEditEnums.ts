import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';

interface Props {
    id: number;
}

export const useAddEditEnums = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [allTypes, setAllTypes] = useState<{ id: number; type: string }[]>([]);
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        type: 1,
        order: 0,
        effectOne: 0,
        effectTwo: 'DAY',
    });

    useEffect(() => {
        if (props.id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(true);
            getEnumTypes();
        }
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/enums/edit/${props.id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setAllTypes(response.data.enumTypes);
            const data = response.data.chosenEnum[0];
            setDefaultValues({
                name: data.value,
                type: data.enum_type_id,
                order: data.list_priority,
                effectOne: data.payload ? data.payload : defaultValues.effectOne,
                effectTwo: data.payload_two ? data.payload_two : defaultValues.effectTwo,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const getEnumTypes = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/enums/types`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setAllTypes(response.data.enumTypes);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    return { allTypes, defaultValues, loading, error };
};
