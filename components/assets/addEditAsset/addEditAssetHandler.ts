import { GlobalDebug } from '../../debug/globalDebug';
import { addEditAssetConn } from './addEditAssetConn';

export const addEditAssetHandler = async (data: any, parentId: number, id: number, currentProperty: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${parentId > 0 ? 'creating' : 'editing'} this Asset, please try again.`;
    try {
        const response = await addEditAssetConn({
            parentId,
            id,
            propertyId: currentProperty,
            name: data.name,
            note: data.note,
            fieldData: data
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditAssetHandler', [
            ['error', err],
            ['data', data],
        ]);
        alert(alertString);
    }
};
