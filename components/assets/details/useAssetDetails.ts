import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { CustomFieldData } from '../../../commonTypes/CustomFields';

interface Asset {
    id: number;
    property_id: number;
    name: string;
    notes: string;
    parent_id: number;
    parent_name: string;
    grand_parent_id: number;
}

interface RecentJobs {
    id: number;
    asset_name: string;
    type: string;
    title: string;
    created: string;
    completed: number;
}

interface Children {
    id: number;
    name: string;
    parentId: number;
    breadcrumbs: string;
    note: string;
    children: [];
}

interface IncompleteJobs {
    type: string;
    count: number;
}

export const useAssetDetails = (assetId: string) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [assetDetails, setAssetDetails] = useState<Asset>();
    const [recentJobs, setRecentJobs] = useState<RecentJobs[]>([]);
    const [children, setChildren] = useState<Children[]>([]);
    const [customFields, setCustomFields] = useState<CustomFieldData>({ fields: [], enumGroups: {}, fileData: {} });
    const [jobsOfComponents6M, setJobsOfComponents6M] = useState<{ name: string; value: number }[]>([]);
    const [incompleteForAsset, setIncompleteForAsset] = useState<IncompleteJobs[]>([]);

    useEffect(() => {
        if (assetId !== '') {
            reload();
        }
    }, [assetId]);

    const reload = () => {
        setLoading(true);
        setError(false);
        setNoData(false);
        getAssetHandler();
    };

    const getAssetHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/asset/${assetId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                setNoData(true);
            } else {
                setAssetDetails(response.data.assetDetails[0]);
                setCustomFields(response.data.customFields);
                setRecentJobs(response.data.recentJobs);
                setChildren(response.data.tree);
                setJobsOfComponents6M(response.data.jobsOfComponents6M);
                setIncompleteForAsset([
                    { type: 'Non-Overdue Job', count: response.data.incompleteForAsset[0].incomplete },
                    { type: 'Overdue Job', count: response.data.incompleteForAsset[0].overdue },
                    { type: 'Non-Overdue PM', count: response.data.incompleteForAsset[1].incomplete },
                    { type: 'Overdue PM', count: response.data.incompleteForAsset[1].overdue },
                ]);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { assetDetails, customFields, recentJobs, children, jobsOfComponents6M, incompleteForAsset, loading, noData, error, reload };
};
