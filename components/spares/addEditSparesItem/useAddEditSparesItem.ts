import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../utility/routing/addressAPI';
import { CustomFieldData, DefaultValues, FieldValue } from '../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../utility/debug/globalDebug';

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

export const useAddEditSparesItem = (id: number, currentFacility: number) => {
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
            const response = await axios.get(`${SERVER_URL}/fields/spare/0`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditSparesItem/getFields', [['response', response]]);
            setCustomFields(response.data);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditSparesItem/getFields', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spare/${id}/${currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditSparesItem/getHandler', [['response', response]]);
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
            GlobalDebug('useAddEditSparesItem/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, customFields, loading, error };
};
