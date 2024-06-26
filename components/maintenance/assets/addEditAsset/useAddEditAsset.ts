import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { CustomFieldData, DefaultValues, FieldValue } from '../../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

export const useAddEditAsset = (assetId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [defaultValues, setDefaultValues] = useState<DefaultValues>({
        name: '',
        revenue: null,
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
            const response = await axios.get(`${SERVER_URL}/fields/asset/0`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditAsset/getFields', [['response', response]]);
            setCustomFields(response.data);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditAsset/getFields', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/maintenance/asset/${assetId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditAsset/getHandler', [['response', response]]);
            setCustomFields(response.data.customFields);
            const defaultVal: DefaultValues = {
                name: response.data.assetDetails[0].name,
                revenue: response.data.assetDetails[0].revenue || null,
                note: response.data.assetDetails[0].notes || '',
            };
            response.data.customFields.fields.forEach((field: FieldValue) => {
                defaultVal[field.id] = field.value;
            });
            setDefaultValues(defaultVal);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAddEditAsset/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, customFields, loading, error };
};
