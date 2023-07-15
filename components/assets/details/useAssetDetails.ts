import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';

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

interface SetModalProps {
    value: SetStateAction<{
        type: string;
        id: number;
        name: string;
        note: string;
    }>;
}

export const useAssetDetails = (assetId: string, setModalProps: (value: SetModalProps['value']) => void) => {
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);
    const [error, setError] = useState(false);
    const [assetDetails, setAssetDetails] = useState<Asset>();
    const [recentJobs, setRecentJobs] = useState<RecentJobs[]>([]);
    const [children, setChildren] = useState<Children[]>([]);

    useEffect(() => {
        reload();
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
                setModalProps({ type: 'edit', id: response.data.assetDetails[0].id, name: response.data.assetDetails[0].name, note: response.data.assetDetails[0].notes });
                setRecentJobs(response.data.recentJobs);
                setChildren(response.data.tree);
            }
            setLoading(false);
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    };
    return { assetDetails, recentJobs, children, loading, noData, error, reload };
};
