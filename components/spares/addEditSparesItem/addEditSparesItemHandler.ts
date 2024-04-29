import { GlobalDebug } from '../../debug/globalDebug';
import { addEditSparesItemConn } from './addEditSparesItemConn';

export const addEditSparesItemHandler = async (data: any, currentFacility: number, id: number, closeModal: () => void, name: string) => {
    const alertString = `There has been an issue ${name.length > 0 ? 'editing' : 'creating'} this Spares Item, please try again.`;
    try {
        const response = await addEditSparesItemConn({
            partNo: data.partNo,
            manPartNo: data.manPartNo,
            name: data.name,
            manName: data.manName,
            description: data.description,
            notes: data.notes,
            location: data.location,
            quantRemaining: data.quantRemaining,
            supplier: data.supplier,
            cost: data.cost,
            facilityId: currentFacility,
            id: id,
            fieldData: data,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditSparesItemHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
            ['currentFacility', currentFacility],
            ['name', name],
        ]);
        alert(alertString);
    }
};
