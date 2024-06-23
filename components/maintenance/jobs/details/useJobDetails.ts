import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../routing/addressAPI';
import axios from 'axios';
import { CustomFieldData } from '../../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../../debug/globalDebug';

interface Job {
    id: number;
    facility_name: string;
    asset_name: string;
    comp_date: null | string;
    completed: number;
    created: string;
    description: string;
    logged_time: null | number;
    notes: null | string;
    reported_by: string;
    required_comp_date: string;
    status: string;
    type: string;
    urgency: string;
    title: string;
}

interface TimeDetails {
    id: number;
    time: number;
    first: string;
    last: string;
}

interface Spare {
    id: number;
    part_no: string;
    name: string;
}

interface UsedSpares extends Spare {
    quantity: number;
}

interface Downtime {
    id: number;
    name: string;
    time: number;
}

export const useJobDetails = (jobId: string) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [jobDetails, setJobDetails] = useState<Job>();
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [files, setFiles] = useState<{ id: string; name: string }[]>([]);
    const [timeDetails, setTimeDetails] = useState<TimeDetails[]>([]);
    const [sparesDetails, setSparesDetails] = useState<UsedSpares[]>([]);
    const [missingSpares, setMissingSpares] = useState<Spare[]>([]);
    const [downtime, setDowntime] = useState<Downtime[]>([]);

    useEffect(() => {
        if (jobId !== '') {
            reload();
        }
    }, [jobId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getJobHandler();
    };

    const getJobHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/maintenance/jobs/${jobId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useJobDetails/getJobHandler', [['response', response]]);
            if (response.data.jobDetails.length === 0) {
                setNoData(true);
            } else {
                setJobDetails(response.data.jobDetails[0]);
                setCustomFields(response.data.customFields);
                setFiles(response.data.files || []);
                setTimeDetails(response.data.timeDetails || []);
                setSparesDetails(response.data.usedSpares || []);
                setMissingSpares(response.data.missingSpares || []);
                setDowntime(response.data.downtime || []);
            }
            setLoading(false);
        } catch (err) {
            GlobalDebug('useJobDetails/getJobHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { jobDetails, customFields, files, timeDetails, sparesDetails, missingSpares, downtime, loading, noData, error, reload };
};
