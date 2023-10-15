import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

interface Property {
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
    count: number
}

export const usePropertyDetails = (propertyNumber: string) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [propertyDetails, setPropertyDetails] = useState<Property>();
    const [assignedUsers, setAssignedUsers] = useState<User[]>([]);
    const [recentJobs, setRecentJobs] = useState<RecentJobs[]>([]);
    const [incompleteJobs, setIncompleteJobs] = useState<IncompleteJobs[]>([]);

    useEffect(() => {
        reload();
    }, []);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getPropertyHandler();
    };

    const getPropertyHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/properties/${propertyNumber}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            const data = response.data;
            if (data.propDetails.length === 0) {
                setNoData(true);
            } else {
                setPropertyDetails(data.propDetails[0]);
                setAssignedUsers(data.assignedUsers);
                setRecentJobs(data.recentJobs);
                console.log(data.incompleteJobs)
                setIncompleteJobs([{type: 'Incomplete', count: data.incompleteJobs[0].incomplete}, {type: 'Overdue', count: data.incompleteJobs[0].overdue}]);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { propertyDetails, assignedUsers, recentJobs, incompleteJobs, loading, noData, error, reload };
};
