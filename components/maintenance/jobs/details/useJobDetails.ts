import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import axios from 'axios';
import { CustomFieldData, FileData } from '../../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../../utility/debug/globalDebug';
import { AuditTopic } from '../../../../commonTypes/audits';

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
    const [audit, setAudit] = useState<AuditTopic[]>([]);
    const [auditFiles, setAuditFiles] = useState<FileData>({});
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
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
                setAudit(response.data.audit);
                setAuditFiles(response.data.auditFiles);
                setCustomFields(response.data.customFields);
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
    return { jobDetails, audit, auditFiles, customFields, timeDetails, sparesDetails, missingSpares, downtime, loading, noData, error, reload };
};
