import { setCurrentProperty } from '../../store/propertySlice';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { addEditPropertyConn } from './addEditPropertyConn';
import { GlobalDebug } from '../../debug/globalDebug';

export const addEditPropertyHandler = async (data: any, id: number, closeModal: () => void, dispatch: Dispatch<AnyAction>, propertyNumber?: number) => {
    const alertString = `There has been an issue ${propertyNumber && propertyNumber > 0 ? 'editing' : 'creating'} this Property, please try again.`;
    try {
        const response = await addEditPropertyConn({
            id: id,
            name: data.propertyName,
            address: data.address,
            city: data.city,
            county: data.county,
            postcode: data.postcode,
            fieldData: data,
        });
        if (response.data.created) {
            dispatch(setCurrentProperty({ currentProperty: response.data.newPropId }));
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditPropertyHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
            ['propertyNumber', propertyNumber],
        ]);
        alert(alertString);
    }
};
