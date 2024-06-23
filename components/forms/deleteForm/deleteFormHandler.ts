import { GlobalDebug } from '../../utility/debug/globalDebug';
import { deleteFormConn } from './deleteFormConn';

export const deleteFormHandler = async (name: string, url: string, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue deleting ${name}, please try again.`;
    try {
        const response = await deleteFormConn(url, id);
        if (response.data.deleted) {
            closeModal();
        } else {
            if (response.data.message) {
                alert(response.data.message);
            } else {
                alert(alertString);
            }
        }
    } catch (err) {
        GlobalDebug('deleteFormHandler', [
            ['error', err],
            ['name', name],
            ['url', url],
            ['id', id],
        ]);
        alert(alertString);
    }
};
