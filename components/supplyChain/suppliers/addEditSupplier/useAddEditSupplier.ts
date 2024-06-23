import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

export const useAddEditSupplier = (id: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        website: 'https://',
        phone: '',
        primContact: '',
        primContactPhone: '',
        address: '',
        city: '',
        county: '',
        postcode: '',
        supplies: '',
    });

    useEffect(() => {
        if (id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/supplier/${id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditSupplier/getHandler', [['response', response]]);
            const supply = response.data[0];
            if (supply.length === 0) {
                setError(true);
            } else {
                setDefaultValues({
                    name: supply.name,
                    website: supply.website,
                    phone: supply.phone,
                    primContact: supply.prim_contact,
                    primContactPhone: supply.prim_contact_phone,
                    address: supply.address,
                    city: supply.city,
                    county: supply.county,
                    postcode: supply.postcode,
                    supplies: supply.supplies,
                });
            }
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditSupplier/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, loading, error };
};
