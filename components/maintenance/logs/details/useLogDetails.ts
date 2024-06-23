import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import { CustomFieldData } from '../../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../../debug/globalDebug';

interface Props {
    logId: number;
}

interface Log {
    id: number;
    title: string;
    description: string;
    created: string;
    required_comp_date: string;
    completed: number;
    comp_date: string;
    completed_by: string;
    frequency: string;
}

interface LogField {
    id: number;
    type: string;
    enumGroupId: number | null;
    name: string;
    value?: string;
}

export const useLogDetails = (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [log, setLog] = useState<Log>();
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });

    useEffect(() => {
        if (props.logId !== 0) {
            reload();
        }
    }, [props.logId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/logs/log/${props.logId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useLogDetails/getHandler', [['response', response]]);
            setLog(response.data.log[0]);
            setCustomFields(response.data.customFields);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useLogDetails/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { log, customFields, loading, error, reload };
};
