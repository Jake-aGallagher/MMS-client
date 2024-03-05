import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { CustomFieldData, DefaultValues, FieldValue } from '../../../commonTypes/CustomFields';
import { GlobalDebug } from '../../debug/globalDebug';

interface StatusOptions {
    id: string;
    value: string;
}

interface SparesSelected {
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

export const useEditPM = (currentProperty: number, PMId: number) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [statusOptions, setStatusOptions] = useState<StatusOptions[]>([]);
    const [sparesSelected, setSparesSelected] = useState<SparesSelected[]>([]);
    const [scheduleDates, setScheduleDates] = useState<{ current_schedule: string; new_schedule: string }[]>([{ current_schedule: '', new_schedule: '' }]);
    const [loggedTimeDetails, setLoggedTimeDetails] = useState<LoggedTime[]>([]);
    const [completableStatus, setCompletableStatus] = useState<number[]>([]);
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [defaultValues, setDefaultValues] = useState<DefaultValues>({
        status: '0',
        notes: '',
        continueSchedule: 'Yes',
    });

    useEffect(() => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getUpdate();
    }, []);

    const getUpdate = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/pms/edit/${currentProperty}/${PMId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useEditPM/getUpdate', [['response', response]]);
            if (response.data.PMDetails === 0) {
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
                const data = response.data.PMDetails[0];
                setScheduleDates(response.data.scheduleDates);
                setCustomFields(response.data.customFields);
                const defaultVal: DefaultValues = {
                    status: data.status,
                    notes: data.notes ? data.notes : '',
                    continueSchedule: 'Yes',
                };
                response.data.customFields.fields.forEach((field: FieldValue) => {
                    defaultVal[field.id] = field.value;
                });
                setDefaultValues(defaultVal);
                setNoData(false);
            }
            setLoading(false);
        } catch (err) {
            GlobalDebug('useEditPM/getUpdate', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { statusOptions, completableStatus, sparesSelected, setSparesSelected, scheduleDates, loggedTimeDetails, setLoggedTimeDetails, defaultValues, customFields, loading, noData, error };
};
