import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import { SERVER_URL } from '../../routing/addressAPI';
import { GlobalDebug } from '../../debug/globalDebug';

interface Asset {
    id: number;
    name: string;
}

interface AssetDowntime extends Asset {
    time: number;
}

export const useDowntimeSelector = (assetsSelected: AssetDowntime[]) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const currentProperty = useSelector((state: RootState) => state.currentProperty.value.currentProperty);
    const [assetList, setAssetList] = useState<AssetDowntime[]>([]);

    useEffect(() => {
        if (currentProperty !== 0) {
            getHandler();
        }
    }, [currentProperty]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/assets/revenues/${currentProperty}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useDowntimeSelector/getHandler', [['response', response]]);
            mergeArrays(response.data.assets);
            setLoading(false);
        } catch (err) {
            GlobalDebug('useDowntimeSelector/getHandler', [['error', err]]);
            setError(true);
            setLoading(false);
        }
    };

    const mergeArrays = (fullAssetList: Asset[]) => {
        const idListInUse: { [key: number]: true | undefined } = {};
        const mergedList: AssetDowntime[] = [];
        if (assetsSelected.length > 0) {
            assetsSelected.forEach((item) => {
                idListInUse[item.id] = true;
            });
        }
        
        fullAssetList.forEach((item) => {
            if (idListInUse[item.id] == undefined) {
                mergedList.push({ ...item, time: 0 });
            }
        });
        setAssetList(mergedList);
        setLoading(false);
    };

    return { assetList, loading, error };
};
