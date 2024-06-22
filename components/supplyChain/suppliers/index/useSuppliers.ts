import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import axios from 'axios';
import { GlobalDebug } from '../../../debug/globalDebug';

interface Props {
    currentFacility: number;
}

interface Suppliers {
    id: number;
    name: string;
    website: string;
    phone: string;
    prim_contact: string;
    prim_contact_phone: string;
    address: string;
    city: string;
    county: string;
    postcode: string;
    supplies: string;
}

export const useSuppliers = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [suppliersList, setSuppliersList] = useState<Suppliers[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/suppliers/${props.currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useSuppliers/getHandler', [['response', response]]);
            setSuppliersList(response.data);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useSuppliers/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { suppliersList, loading, error, reload };
};
