import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../utility/routing/addressAPI';
import { CustomFieldData, DefaultValues, FieldValue } from '../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../utility/debug/globalDebug';

interface Props {
    facilityNumber: number;
}

export const useAddEditFacility = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [id, setId] = useState(props.facilityNumber);
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [defaultValues, setDefaultValues] = useState<DefaultValues>({
        facilityName: '',
        address: '',
        city: '',
        county: '',
        postcode: '',
    });

    useEffect(() => {
        if (props.facilityNumber > 0) {
            setLoading(true);
            setError(false);
            getFacilityHandler();
        } else {
            setLoading(false);
        }
    }, []);

    const getFacilityHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/facilities/${props.facilityNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAddEditFacility/getFacilityHandler', [['response', response]]);
            const data = response.data.facilityDetails[0];
            setId(parseInt(data.id));
            setCustomFields(response.data.customFields);
            const defaultVal: DefaultValues = {
                facilityName: data.name,
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
            GlobalDebug('useAddEditFacility/getFacilityHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, customFields, id, loading, error };
};
