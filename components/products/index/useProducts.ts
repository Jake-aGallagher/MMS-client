import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../utility/routing/addressAPI';
import { GlobalDebug } from '../../utility/debug/globalDebug';

interface Product {
    id: number;
    name: string;
    type: string;
    description: string;
    price: number;
    sku: string;
    leadTime: number;
    leadTimeUnit: string;
    weight: number;
    weightUnit: string;
    length: number;
    lengthUnit: string;
    width: number;
    widthUnit: string;
    height: number;
    heightUnit: string;
    barcode: string;
}

export const useProducts = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [allProducts, setAllProducts] = useState<Product[]>([]);

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
            const response = await axios.get(`${SERVER_URL}/products/all-products`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useProducts/getHandler', [['response', response]]);
            setAllProducts(response.data);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useProducts/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { allProducts, loading, error, reload };
};
