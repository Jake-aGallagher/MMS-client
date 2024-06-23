import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { CustomFieldData, DefaultValues, FieldValue } from '../../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

interface StatusOptions {
    id: string;
    value: string;
}

interface Spare {
    id: number;
    part_no: string;
    name: string;
    quantity: number;
}

interface LoggedTime {
    id: number;
    name: string;
    time: number;
}

interface Downtime {
    id: number;
    name: string;
    time: number;
}

export const useUpdateJob = (currentFacility: number, jobId: number) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [statusOptions, setStatusOptions] = useState<StatusOptions[]>([]);
    const [sparesSelected, setSparesSelected] = useState<Spare[]>([]);
    const [sparesMissing, setSparesMissing] = useState<Spare[]>([]);
    const [downtime, setDowntime] = useState<Downtime[]>([]);
    const [completed, setCompleted] = useState(0);
    const [loggedTimeDetails, setLoggedTimeDetails] = useState<LoggedTime[]>([]);
    const [completableStatus, setCompletableStatus] = useState<number[]>([]);
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [defaultValues, setDefaultValues] = useState<DefaultValues>({
        status: '0',
        description: '',
        notes: '',
        completed: 0,
    });

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getJobUpdate();
    }, []);

    const getJobUpdate = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/maintenance/jobs/update/${currentFacility}/${jobId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useUpdateJob/getJobUpdate', [['response', response]]);
            if (response.data.jobDetails === 0) {
                setNoData(true);
            } else {
                setStatusOptions(response.data.statusOptions);
                setCompletableStatus(response.data.completableStatus);
                if (response.data.usedSpares) {
                    setSparesSelected(response.data.usedSpares);
                }
                if (response.data.timeDetails) {
                    setLoggedTimeDetails(response.data.timeDetails);
                }
                if (response.data.missingSpares) {
                    setSparesMissing(response.data.missingSpares);
                }
                if (response.data.downtime) {
                    setDowntime(response.data.downtime);
                }
                const data = response.data.jobDetails[0];
                setCompleted(data.completed);
                setCustomFields(response.data.customFields);
                const defaultVal: DefaultValues = {
                    status: data.status_id,
                    description: data.description ? data.description : '',
                    notes: data.notes ? data.notes : '',
                    completed: 0,
                };
                response.data.customFields.fields.forEach((field: FieldValue) => {
                    defaultVal[field.id] = field.value;
                });
                setDefaultValues(defaultVal);
                setNoData(false);
            }
            setLoading(false);
        } catch (err) {
            GlobalDebug('useUpdateJob/getJobUpdate', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return {
        statusOptions,
        completableStatus,
        sparesSelected,
        setSparesSelected,
        loggedTimeDetails,
        setLoggedTimeDetails,
        sparesMissing,
        setSparesMissing,
        downtime,
        setDowntime,
        completed,
        defaultValues,
        customFields,
        loading,
        noData,
        error,
    };
};
