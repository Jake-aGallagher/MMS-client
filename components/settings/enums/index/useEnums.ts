import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';

interface Enum {
    id: number;
    enum_type_id: number;
    typeString: string;
    value: string;
    list_priority: number;
    payload: number | null;
    payload_two: string | null;
}

interface EnumType {
    id: number;
    type: string;
}

export const useEnums = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [enums, setEnums] = useState<Enum[]>([]);
    const [enumTypes, setEnumTypes] = useState<EnumType[]>([]);

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
            const enumsList = await axios.get(`${SERVER_URL}/enums/typesvalues`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setEnums(enumsList.data.enums);
            setEnumTypes(enumsList.data.enumTypes);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { enums, enumTypes, loading, error, reload };
};
