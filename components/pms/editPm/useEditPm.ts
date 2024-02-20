import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

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
    const [defaultValues, setDefaultValues] = useState({
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
                setDefaultValues({
                    status: data.status,
                    notes: data.notes ? data.notes : '',
                    continueSchedule: 'Yes',
                });
                setNoData(false);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { statusOptions, completableStatus, sparesSelected, setSparesSelected, scheduleDates, loggedTimeDetails, setLoggedTimeDetails, defaultValues, loading, noData, error };
};
