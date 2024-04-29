import { Dispatch } from 'react';
import { setCurrentFacility } from '../store/facilitySlice';
import { UnknownAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { SERVER_URL } from '../routing/addressAPI';
import { GlobalDebug } from '../debug/globalDebug';

export const changeFacility = async (dispatch: Dispatch<UnknownAction>, userId: number, newFacilityId: number) => {
    const alertString = 'There has been an issue changing facility, please try again.';
    try {
        const response = await axios.put(
            `${SERVER_URL}/facilities/Last-facility`,
            {
                userId: userId,
                facilityId: newFacilityId,
            },
            {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            }
        );
        if (response.data.created) {
            dispatch(
                setCurrentFacility({
                    currentFacility: newFacilityId,
                })
            );
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('changeFacility', [
            ['error', err],
            ['userId', userId],
            ['newFacilityId', newFacilityId],
        ]);
        alert(alertString);
    }
};
