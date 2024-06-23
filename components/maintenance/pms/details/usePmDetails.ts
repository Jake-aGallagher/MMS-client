import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import axios from 'axios';
import { CustomFieldData } from '../../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

interface PM {
    id: number;
    schedule_id: number;
    title: string;
    asset: string;
    type: string;
    description: string;
    notes: string;
    created: string;
    required_comp_date: string;
    status: string;
    completed: number;
    comp_date: string;
    logged_time: number;
}

interface TimeDetails {
    id: number;
    time: number;
    first: string;
    last: string;
}

interface UsedSpares {
    id: number;
    quantity: number;
    part_no: string;
    name: string;
}

export const usePMDetails = (PMId: string) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [pmDetails, setPmDetails] = useState<PM>();
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [timeDetails, setTimeDetails] = useState<TimeDetails[]>([]);
    const [sparesDetails, setSparesDetails] = useState<UsedSpares[]>([]);

    useEffect(() => {
        if (PMId !== '') {
            reload();
        }
    }, [PMId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getHandler();
    };

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/maintenance/pms/pm/${PMId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('usePMDetails/getHandler', [['response', response]]);
            if (response.data.pm.length === 0) {
                setNoData(true);
            } else {
                setPmDetails(response.data.pm[0]);
                setCustomFields(response.data.customFields);
                setTimeDetails(response.data.timeDetails || []);
                setSparesDetails(response.data.usedSpares || []);
            }
            setLoading(false);
        } catch (err) {
            GlobalDebug('usePMDetails/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { pmDetails, customFields, timeDetails, sparesDetails, loading, noData, error, reload };
};
