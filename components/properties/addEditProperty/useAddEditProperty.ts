import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { CustomFieldData, DefaultValues, FieldValue } from '../../../commonTypes/CustomFields';

interface Props {
    propertyNumber: number;
}

export const useAddEditProperty = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [id, setId] = useState(props.propertyNumber);
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [defaultValues, setDefaultValues] = useState<DefaultValues>({
        propertyName: '',
        type: 'Factory',
        address: '',
        city: '',
        county: '',
        postcode: '',
    });

    useEffect(() => {
        if (props.propertyNumber > 0) {
            setLoading(true);
            setError(false);
            getPropertyHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getPropertyHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/properties/${props.propertyNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const data = response.data.propDetails[0];
            setId(parseInt(data.id));
            setCustomFields(response.data.customFields);
            const defaultVal: DefaultValues = {
                propertyName: data.name,
                type: data.type,
                address: data.address,
                city: data.city,
                county: data.county,
                postcode: data.postcode,
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
    return { defaultValues, customFields, id, loading, error };
};
