import { useEffect, useState } from 'react';
import { SERVER_URL } from '../routing/addressAPI';
import axios from 'axios';

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
    const [logFields, setLogFields] = useState<LogTemplateFields[]>([]);
    const [defaultValues, setDefaultValues] = useState<{ [key: string]: string | number | boolean }>({});
    const [logDates, setLogDates] = useState<{ current_schedule: string; new_schedule: string }[]>([{ current_schedule: '', new_schedule: '' }]);
    const [enumGroups, setEnumGroups] = useState<{ [key: string]: { id: string; value: string }[] }>({});
    const [fileData, setFileData] = useState<{[key:string]: { id: string; encodedId: string; name: string }[]}>({});
    const [logTitleDescription, setLogTitleDescription] = useState<{ title: string; description: string }>({ title: '', description: '' });

    useEffect(() => {
        reload();
    }, []);

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
            setLogFields(response.data.logFields);
            setEnumGroups(response.data.enumGroups);
            setLogDates(response.data.logDates);
            const defaultVal: { [key: string]: string | number | boolean } = {};
            response.data.logFields.forEach((field: LogTemplateFields) => {
                defaultVal[field.id] = field.value;
            });
            setFileData(response.data.fileData);
            setLogTitleDescription(response.data.logTitleDescription);
            setDefaultValues(defaultVal);
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { logFields, enumGroups, fileData, defaultValues, logDates, logTitleDescription, loading, error, reload };
};
