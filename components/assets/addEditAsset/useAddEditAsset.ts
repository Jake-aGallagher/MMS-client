import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { CustomFieldData, DefaultValues, FieldValue } from '../../../commonTypes/CustomFields';

export const useAddEditAsset = (assetId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [defaultValues, setDefaultValues] = useState<DefaultValues>({
        name: '',
        note: '',
    });

    useEffect(() => {
        if (assetId > 0) {
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
            const response = await axios.get(`${SERVER_URL}/fields/asset`, {
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
            const response = await axios.get(`${SERVER_URL}/asset/${assetId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setCustomFields(response.data.customFields);
            const defaultVal: DefaultValues = {
                name: response.data.assetDetails[0].name,
                note: response.data.assetDetails[0].notes || '',
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
