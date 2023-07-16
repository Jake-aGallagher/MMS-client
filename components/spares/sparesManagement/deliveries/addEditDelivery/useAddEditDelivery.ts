import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../../routing/addressAPI';

interface Supplier {
    id: number;
    name: string;
}

interface Contents {
    id: number;
    part_no: string;
    name: string;
    num_used: number;
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

export const useAddEditDelivery = (id: number, currentProperty: number) => {
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
            const response = await axios.get(`${SERVER_URL}/spares/suppliers/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setSuppliersList(response.data);
            setDefaultValues({ ...defaultValues, supplier: response.data[0].id });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    const getHandlerFull = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spares/deliveries/${currentProperty}/${id}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setSuppliersList(response.data.suppliers);
            const delivery = response.data.deliverywithContents[0];
            formatContents(delivery.contents);
            setDefaultValues({
                name: delivery.name,
                supplier: delivery.supplier,
                courier: delivery.courier,
                placed: delivery.placed,
                due: delivery.due,
                arrived: false,
            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };

    // todo adjust architecture of used spares to use quantity so that the following function can be removed
    // This is a stop gap function required due to tight coupling but incorrect typings of the used spares modal helper
    const formatContents = (deliveryItems: RetrievedContents[]) => {
        const adjustedContentsArr: Contents[] = [];

        deliveryItems.forEach((deliveryItem) => {
            adjustedContentsArr.push({ id: deliveryItem.spare_id, part_no: deliveryItem.part_no, name: deliveryItem.name, num_used: deliveryItem.quantity });
        });

        setContents(adjustedContentsArr);
    };
    return { defaultValues, suppliersList, contents, loading, error, setContents };
};
