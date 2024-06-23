import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

interface AssetTreeItem {
    id: number;
    parentId: number;
    name: string;
    note: string;
    breadcrumbs: string;
    children: [];
}

export const useAssets = (currentFacility: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [assetTree, setAssetTree] = useState<AssetTreeItem[]>([]);

    useEffect(() => {
        if (currentFacility !== 0) {
            reload();
        }
    }, [currentFacility]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getAssetTree();
    };

    const getAssetTree = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/maintenance/asset-tree/${currentFacility}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useAssets/getAssetTree', [['response', response]]);
            setAssetTree(response.data);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAssets/getAssetTree', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };
    return { assetTree, loading, error, reload };
};
