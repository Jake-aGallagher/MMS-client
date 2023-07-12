import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../routing/addressAPI';
import axios from 'axios';

interface Props {
    currentProperty: number;
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
        reload();
    }, [props.currentProperty]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares/suppliers/${props.currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setSuppliersList(response.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { suppliersList, loading, error, reload };
};
