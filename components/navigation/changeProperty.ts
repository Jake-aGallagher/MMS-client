import { Dispatch } from 'react';
import { setCurrentProperty } from '../store/propertySlice';
import { UnknownAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { GlobalDebug } from '../debug/globalDebug';

export const changeProperty = async (dispatch: Dispatch<UnknownAction>, userId: number, newPropId: number) => {
    const alertString = 'There has been an issue changing property, please try again.';
    try {
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
        GlobalDebug('changeProperty', [
            ['error', err],
            ['userId', userId],
            ['newPropId', newPropId],
        ]);
        alert(alertString);
    }
};
