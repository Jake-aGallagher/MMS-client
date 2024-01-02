import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface TypeOptions {
    id: number;
    value: string;
}

export const useEditSchedule = (PMScheduleId: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [typeOptions, setTypeOptions] = useState<TypeOptions[]>([]);
    const [defaultValues, setDefaultValues] = useState({
        type: '',
        title: '',
        description: '',
        editStart: 'No',
        scheduleStart: '',
        frequencyTime: 1,
        frequencyUnit: 'WEEK',
    });

    useEffect(() => {
        setLoading(true);
        setError(false);
        getHandler();
    }, []);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/schedule-template/edit-schedule/${PMScheduleId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            console.log(response.data);
            setTypeOptions(response.data.types);
            setDefaultValues({
                ...defaultValues,
                type: response.data.PMScheduleDetails[0].type,
                title: response.data.PMScheduleDetails[0].title,
                description: response.data.PMScheduleDetails[0].description,
                frequencyTime: response.data.PMScheduleDetails[0].frequency_time,
                frequencyUnit: response.data.PMScheduleDetails[0].frequency_unit,

            });
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { defaultValues, typeOptions, loading, error };
};