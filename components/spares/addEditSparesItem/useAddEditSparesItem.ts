import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { CustomFieldData, DefaultValues, FieldValue } from '../../../commonTypes/CustomFields';

interface Spare {
    id: number;
    part_no: string;
    man_part_no: string;
    name: string;
    man_name: string;
    description: string;
    notes: string;
    location: string;
    quant_remain: number;
    supplier: string;
    cost: number;
}

export const useAddEditSparesItem = (id: number, currentProperty: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [defaultValues, setDefaultValues] = useState<DefaultValues>({
        partNo: '',
        manPartNo: '',
        name: '',
        manName: '',
        description: '',
        notes: '',
        location: '',
        quantRemaining: 0,
        supplier: '',
        cost: 0,
    });

    useEffect(() => {
        if (id > 0) {
            setLoading(true);
            setError(false);
            getHandler();
        } else {
            setLoading(true);
            setError(false);
            getFields();
        }
    }, []);

    const getFields = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/fields/spare`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setCustomFields(response.data);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spare/${id}/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const s: Spare = response.data.spares[0];
            setCustomFields(response.data.customFields);
            const defaultVal: DefaultValues = {
                partNo: s.part_no,
                manPartNo: s.man_part_no,
                name: s.name,
                manName: s.man_name,
                description: s.description,
                notes: s.notes,
                location: s.location,
                quantRemaining: s.quant_remain,
                supplier: s.supplier,
                cost: s.cost,
            };
            response.data.customFields.fields.forEach((field: FieldValue) => {
                defaultVal[field.id] = field.value;
            });
            setDefaultValues(defaultVal);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, customFields, loading, error };
};
