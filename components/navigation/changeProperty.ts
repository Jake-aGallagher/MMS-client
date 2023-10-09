import { Dispatch } from 'react';
import { setCurrentProperty } from '../store/propertySlice';
import { AnyAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';

export const changeProperty = async (dispatch: Dispatch<AnyAction>, userId: number, newPropIdString: string) => {
    const alertString = 'There has been an issue changing property, please try again.';
    try {
        const newPropId = parseInt(newPropIdString);
        const response = await axios.put(
            `${SERVER_URL}/properties/Last-property`,
            {
                userId: userId,
                propertyId: newPropId,
            },
            {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            }
        );
        if (response.data.created) {
            dispatch(
                setCurrentProperty({
                    currentProperty: newPropId,
                })
            );
        } else {
            alert(alertString);
        }
    } catch (err) {
        alert(alertString);
    }
};
