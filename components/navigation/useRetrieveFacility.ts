import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../utility/routing/addressAPI';
import { useDispatch } from 'react-redux';
import { setCurrentFacility } from '../store/facilitySlice';
import { GlobalDebug } from '../utility/debug/globalDebug';

interface Props {
    currentFacility: number;
    userId: number;
}

interface AvailFacilities {
    id: number;
    name: string;
    lastFacility?: boolean;
}

export const useRetrieveFacility = (props: Props) => {
    const [availFacilities, setAvailFacilities] = useState<AvailFacilities[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.userId !== 0) {
            getHandler();
        }
    }, [props.currentFacility, props.userId]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/facilities/last-facility/${props.userId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            GlobalDebug('useRetrieveFacility/getHandler', [['response', response]]);
            if (response.data.length === 0) {
                alert('You are not assigned to any Facilities, please speak to your Line Manager');
            } else {
                setAvailFacilities(response.data);
                let hasSelectedFacility = false;
                response.data.forEach((facility: AvailFacilities) => {
                    if (facility.lastFacility == true) {
                        dispatch(
                            setCurrentFacility({
                                currentFacility: facility.id,
                            })
                        );
                        hasSelectedFacility = true;
                    }
                });
                if (hasSelectedFacility === false) {
                    dispatch(
                        setCurrentFacility({
                            currentFacility: response.data[0].id,
                        })
                    );
                }
            }
        } catch (err) {
            GlobalDebug('useRetrieveFacility/getHandler', [['error', err]]);
            alert('There has been an error whilst attempting to retrive your assigned facilities, please try again');
        }
    };
    return { availFacilities };
};
