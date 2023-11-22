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
    name: string
    time: number;
}

export const useUpdateJob = (currentProperty: number, jobId: number) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [statusOptions, setStatusOptions] = useState<StatusOptions[]>([]);
    const [sparesSelected, setSparesSelected] = useState<SparesSelected[]>([]);
    const [completed, setCompleted] = useState(0);
    const [loggedTimeDetails, setLoggedTimeDetails] = useState<LoggedTime[]>([]);
    const [completableStatus, setCompletableStatus] = useState<number[]>([])
    const [defaultValues, setDefaultValues] = useState({
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
            const response = await axios.get(`${SERVER_URL}/jobs/update/${currentProperty}/${jobId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.jobDetails === 0) {
                setNoData(true);
            } else {
                setStatusOptions(response.data.statusOptions);
                setCompletableStatus(response.data.completableStatus)
                if (response.data.usedSpares) {
                    setSparesSelected(response.data.usedSpares);
                }
                if (response.data.timeDetails) {
                    setLoggedTimeDetails(response.data.timeDetails);
                }
                const data = response.data.jobDetails[0];
                setCompleted(data.completed);
                setDefaultValues({
                    status: data.status,
                    description: data.description ? data.description : '',
                    notes: data.notes ? data.notes : '',
                    completed: 0,
                });
                setNoData(false);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { statusOptions, completableStatus, sparesSelected, setSparesSelected, completed, loggedTimeDetails, setLoggedTimeDetails, defaultValues, loading, noData, error };
};
