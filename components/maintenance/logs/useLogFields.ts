import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import axios from 'axios';
import { CustomFieldData } from '../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../debug/globalDebug';

export interface LogTemplateFields {
    id: number;
    type: string;
    enumGroupId: number | null;
    name: string;
    required: boolean;
    guidance: string;
    value: string | number | boolean;
}

export const useLogFields = (logId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [defaultValues, setDefaultValues] = useState<{ [key: string]: string | number | boolean }>({});
    const [logDates, setLogDates] = useState<{ current_schedule: string; new_schedule: string }[]>([{ current_schedule: '', new_schedule: '' }]);
    const [logTitleDescription, setLogTitleDescription] = useState<{ title: string; description: string }>({ title: '', description: '' });
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });

    useEffect(() => {
        if (logId !== 0) {
            reload();
        }
    }, [logId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getScheduleHandler();
    };

    const getScheduleHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/logs/log-fields/${logId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useLogFields/getScheduleHandler', [['response', response]]);
            setCustomFields(response.data.customFields);
            setLogDates(response.data.logDates);
            const defaultVal: { [key: string]: string | number | boolean } = {};
            response.data.customFields.fields.forEach((field: LogTemplateFields) => {
                defaultVal[field.id] = field.value;
            });
            setLogTitleDescription(response.data.logTitleDescription);
            setDefaultValues(defaultVal);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useLogFields/getScheduleHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { customFields, defaultValues, logDates, logTitleDescription, loading, error, reload };
};
