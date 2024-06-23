import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import axios from 'axios';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

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
    const currentFacility = useSelector((state: RootState) => state.currentFacility.value.currentFacility);
    const [assetList, setAssetList] = useState<AssetDowntime[]>([]);

    useEffect(() => {
        if (currentFacility !== 0) {
            getHandler();
        }
    }, [currentFacility]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/maintenance/assets/revenues/${currentFacility}`, {
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
