import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '../routing/addressAPI';
import { useDispatch } from 'react-redux';
import { setCurrentProperty } from '../store/propertySlice';
import { GlobalDebug } from '../debug/globalDebug';

interface Props {
    currentProperty: number;
    userId: number;
}

interface AvailProps {
    id: number;
    name: string;
    lastProperty?: boolean;
}

export const useRetrieveProperty = (props: Props) => {
    const [availProps, setAvailProps] = useState<AvailProps[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.userId !== 0) {
            getHandler();
        }
    }, [props.currentProperty, props.userId]);

    const getHandler = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/properties/last-property/${props.userId}`, {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            });
            if (response.data.length === 0) {
                alert('You are not assigned to any Properties, please speak to your Line Manager');
            } else {
                setAvailProps(response.data);
                let hasSelectedProp = false;
                response.data.forEach((property: AvailProps) => {
                    if (property.lastProperty == true) {
                        dispatch(
                            setCurrentProperty({
                                currentProperty: property.id,
                            })
                        );
                        hasSelectedProp = true;
                    }
                });
                if (hasSelectedProp === false) {
                    dispatch(
                        setCurrentProperty({
                            currentProperty: response.data[0].id,
                        })
                    );
                }
            }
        } catch (err) {
            GlobalDebug('useRetrieveProperty/getHandler', [
                ['error', err],
            ]);
            alert('There has been an error whilst attempting to retrive your assigned properties, please try again');
        }
    };
    return { availProps };
};
