import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../../routing/addressAPI';
import { GlobalDebug } from '../../debug/globalDebug';

interface AssetTreeItem {
    id: number;
    parentId: number;
    name: string;
    note: string;
    breadcrumbs: string;
    children: [];
}

export const useAssets = (currentProperty: number) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [assetTree, setAssetTree] = useState<AssetTreeItem[]>([]);

    useEffect(() => {
        if (currentProperty !== 0) {
            reload();
        }
    }, [currentProperty]);

    const reload = () => {
        setLoading(true);
        setError(false);
        getAssetTree();
    };

    const getAssetTree = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/asset-tree/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            setAssetTree(response.data);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useAssets/getAssetTree', [
                ['error', err],
            ]);
            setError(true);
            setLoading(false);
        }
    };
    return { assetTree, loading, error, reload };
};
