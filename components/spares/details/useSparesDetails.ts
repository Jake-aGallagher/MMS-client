import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

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

export const useSparesDetails = (spareId: string, currentProperty: string) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [sparesDetails, setSparesDetails] = useState<Spare>();
    const [recentJobs, setRecentJobs] = useState<RecentJobs[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getSpareItemHandler();
    };

    const getSpareItemHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/spare/${spareId}/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.spares.length === 0) {
                setNoData(true);
            } else {
                setSparesDetails(response.data.spares[0]);
                if (response.data.recentJobs.length > 0) {
                    setRecentJobs(response.data.recentJobs);
                }
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { sparesDetails, recentJobs, loading, noData, error, reload };
};
