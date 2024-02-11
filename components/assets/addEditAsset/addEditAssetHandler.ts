import { addEditAssetConn } from './addEditAssetConn';

export const addEditAssetHandler = async (data: any, type: string, id: number, currentProperty: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${type == 'add' ? 'creating' : 'editing'} this Asset, please try again.`;
    try {
        const response = await addEditAssetConn({
            type: type,
            id: id,
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
        alert(alertString);
    }
};
