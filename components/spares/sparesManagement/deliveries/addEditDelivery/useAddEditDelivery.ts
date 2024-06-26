import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../../utility/debug/globalDebug';

interface Supplier {
    id: number;
    name: string;
}

interface Contents {
    id: number;
    part_no: string;
    name: string;
    quantity: number;
}

interface RetrievedContents {
    spare_id: number;
    part_no: string;
    name: string;
    quantity: number;
}

interface Delivery {
    id: number;
    name: string;
    supplier: string;
    courier: string;
    placed: string;
    due: string;
    contents: Contents[];
}

export const useAddEditDelivery = (id: number, currentFacility: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [suppliersList, setSuppliersList] = useState<Supplier[]>();
    const [contents, setContents] = useState<Contents[]>([]);
    const [defaultValues, setDefaultValues] = useState({
        name: '',
        supplier: 0,
        courier: '',
        placed: '',
        due: '',
        arrived: false,
    });

    useEffect(() => {
        if (id > 0) {
            setLoading(true);
            setError(false);
            getHandlerFull();
        } else {
            setLoading(true);
            setError(false);
            getHandlerLimited();
        }
    }, []);

    const getHandlerLimited = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/suppliers/${currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditDelivery/getHandlerLimited', [['response', response]]);
            if (response.data.length === 0) {
                setSuppliersList([{ id: 0, name: 'No suppliers available' }]);
                setDefaultValues({ ...defaultValues, supplier: 0 });
            } else {
                setSuppliersList(response.data);
                setDefaultValues({ ...defaultValues, supplier: response.data[0].id });
            }
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditDelivery/getHandlerLimited', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    const getHandlerFull = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares/deliveries/${currentFacility}/${id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditDelivery/getHandlerFull', [['response', response]]);
            if (response.data.suppliers.length === 0) {
                setSuppliersList([{ id: 0, name: 'No suppliers available' }]);
            } else {
                setSuppliersList(response.data.suppliers);
            }
            const delivery = response.data.deliveries[0];
            formatContents(delivery.contents);
            setDefaultValues({
                name: delivery.name,
                supplier: delivery.supplier,
                courier: delivery.courier,
                placed: delivery.placed,
                due: delivery.due,
                arrived: delivery.arrived,
            });
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditDelivery/getHandlerFull', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    // todo adjust architecture of used spares to use quantity so that the following function can be removed
    // This is a stop gap function required due to tight coupling but incorrect typings of the used spares modal helper
    const formatContents = (deliveryItems: RetrievedContents[]) => {
        const adjustedContentsArr: Contents[] = [];

        deliveryItems.forEach((deliveryItem) => {
            adjustedContentsArr.push({ id: deliveryItem.spare_id, part_no: deliveryItem.part_no, name: deliveryItem.name, quantity: deliveryItem.quantity });
        });

        setContents(adjustedContentsArr);
    };
    return { defaultValues, suppliersList, contents, loading, error, setContents };
};
