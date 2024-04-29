import { setCurrentFacility } from '../../store/facilitySlice';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { addEditFacilityConn } from './addEditFacilityConn';
import { GlobalDebug } from '../../debug/globalDebug';

export const addEditFacilityHandler = async (data: any, id: number, closeModal: () => void, dispatch: Dispatch<AnyAction>, facilityNumber?: number) => {
    const alertString = `There has been an issue ${facilityNumber && facilityNumber > 0 ? 'editing' : 'creating'} this Facility, please try again.`;
    try {
        const response = await addEditFacilityConn({
            id: id,
            name: data.facilityName,
            address: data.address,
            city: data.city,
            county: data.county,
            postcode: data.postcode,
            fieldData: data,
        });
        if (response.data.created) {
            dispatch(setCurrentFacility({ currentFacility: response.data.newFacilityId }));
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditFacilityHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
            ['facilityNumber', facilityNumber],
        ]);
        alert(alertString);
    }
};
