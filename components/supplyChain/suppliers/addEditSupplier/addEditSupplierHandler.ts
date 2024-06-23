import { GlobalDebug } from '../../../utility/debug/globalDebug';
import { addEditSupplierConn } from './addEditSupplierConn';

export const addEditSupplierHandler = async (data: any, currentFacility: number, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Note, please try again.`;
    try {
        const response = await addEditSupplierConn({
            facilityId: currentFacility,
            id: id,
            name: data.name,
            website: data.website,
            phone: data.phone,
            primContact: data.primContact,
            primContactPhone: data.primContactPhone,
            address: data.address,
            city: data.city,
            county: data.county,
            postcode: data.postcode,
            supplies: data.supplies,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditSupplierHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
            ['currentFacility', currentFacility],
        ]);
        alert(alertString);
    }
};
