import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface Props {
    propertyNumber: number;
}

export const useAddEditProperty = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [id, setId] = useState(props.propertyNumber);
    const [defaultValues, setDefaultValues] = useState({
        propertyName: '',
        type: 'Factory',
        address: '',
        city: '',
        county: '',
        postcode: '',
    });

    useEffect(() => {
        if (props.propertyNumber > 0) {
            setLoading(true);
            setError(false);
            getPropertyHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getPropertyHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/properties/${props.propertyNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const data = response.data.propDetails[0];
            setId(parseInt(data.id));
            setDefaultValues({
                propertyName: data.name,
                type: data.type,
                address: data.address,
                city: data.city,
                county: data.county,
                postcode: data.postcode,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, id, loading, error };
};
