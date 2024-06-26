import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../utility/routing/addressAPI';
import { CustomFieldData } from '../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../utility/debug/globalDebug';

interface Spare {
    id: number;
    part_no: string;
    man_part_no: string;
    name: string;
    man_name: string;
    description: string | null;
    notes: string | null;
    location: string;
    quant_remain: number;
    supplier: string;
    reorder_freq: string;
    reorder_num: number;
    running_low: number;
    avg_usage: number;
    cost: number;
}

interface RecentJobs {
    id: number;
    asset_name: string;
    type: string;
    title: string;
    created: string;
    completed: boolean;
}

interface RecentPms {
    id: number;
    asset_name: string;
    type: string;
    title: string;
    required_comp_date: string;
    completed: number;
    frequency: string;
}

export const useSparesDetails = (spareId: string, currentFacility: string) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [sparesDetails, setSparesDetails] = useState<Spare>();
    const [deliveryInfo, setDeliveryInfo] = useState<{ due: string; quantity: number }>({ due: '', quantity: 0 });
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [recentJobs, setRecentJobs] = useState<RecentJobs[]>([]);
    const [recentPms, setRecentPms] = useState<RecentPms[]>([]);
    const [used6M, setUsed6M] = useState<{ month: string; value: number }[]>([]);

    useEffect(() => {
        if (spareId !== '' && currentFacility !== '') {
            reload();
        }
    }, [spareId, currentFacility]);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getSpareItemHandler();
    };

    const getSpareItemHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spare/${spareId}/${currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useSparesDetails/getSpareItemHandler', [['response', response]]);
            if (response.data.spares.length === 0) {
                setNoData(true);
            } else {
                setSparesDetails(response.data.spares[0]);
                setCustomFields(response.data.customFields);
                setDeliveryInfo(response.data.deliveryInfo[0]);
                setUsed6M(response.data.used6M);
                setRecentJobs(response.data.recentJobs);
                setRecentPms(response.data.recentPms);
            }
            setLoading(false);
        } catch (err) {
            GlobalDebug('useSparesDetails/getSpareItemHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { sparesDetails, customFields, deliveryInfo, recentJobs, recentPms, used6M, loading, noData, error, reload };
};
