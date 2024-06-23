import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../utility/routing/addressAPI';
import { CustomFieldData } from '../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../utility/debug/globalDebug';

interface Facility {
    id: number;
    name: string;
    type: string;
    address: string;
    city: string;
    county: string;
    postcode: string;
}

interface User {
    username: string;
    first_name: string;
    last_name: string;
    user_group_id: number;
}

interface RecentJobs {
    id: number;
    asset_name: string;
    type: string;
    title: string;
    created: string;
    completed: number;
}

interface IncompleteJobs {
    type: string;
    count: number;
}

export const useFacilityDetails = (facilityNumber: string) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [facilityDetails, setFacilityDetails] = useState<Facility>();
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [assignedUsers, setAssignedUsers] = useState<User[]>([]);
    const [recentJobs, setRecentJobs] = useState<RecentJobs[]>([]);
    const [incompleteJobs, setIncompleteJobs] = useState<IncompleteJobs[]>([]);
    const [raised6M, setRaised6M] = useState<{ month: string; value: number }[]>([]);
    const [sparesUsed6M, setSparesUsed6M] = useState<{ month: string; value: number }[]>([]);
    const [mostUsed6M, setMostUsed6M] = useState<{ name: string; value: number }[]>([]);
    const [sparesCost6M, setSparesCost6M] = useState<{ month: string; value: number }[]>([]);

    useEffect(() => {
        if (facilityNumber !== '') {
            reload();
        }
    }, [facilityNumber]);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getFacilityHandler();
    };

    const getFacilityHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/facilities/${facilityNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useFacilityDetails/getFacilityHandler', [['response', response]]);
            const data = response.data;
            if (data.facilityDetails.length === 0) {
                setNoData(true);
            } else {
                setFacilityDetails(data.facilityDetails[0]);
                setCustomFields(response.data.customFields);
                setAssignedUsers(data.assignedUsers);
                setRecentJobs(data.recentJobs);
                setIncompleteJobs([
                    { type: 'Non-Overdue Job', count: data.incompleteJobs[0].incomplete },
                    { type: 'Overdue Job', count: data.incompleteJobs[0].overdue },
                    { type: 'Non-Overdue PM', count: data.incompleteJobs[1].incomplete },
                    { type: 'Overdue PM', count: data.incompleteJobs[1].overdue },
                ]);
                setRaised6M(data.raised6M);
                setSparesUsed6M(data.sparesUsed6M);
                setMostUsed6M(data.mostUsed6M);
                setSparesCost6M(data.sparesCost6M);
            }
            setLoading(false);
        } catch (err) {
            GlobalDebug('useFacilityDetails/getFacilityHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { facilityDetails, customFields, assignedUsers, recentJobs, incompleteJobs, raised6M, sparesUsed6M, mostUsed6M, sparesCost6M, loading, noData, error, reload };
};
