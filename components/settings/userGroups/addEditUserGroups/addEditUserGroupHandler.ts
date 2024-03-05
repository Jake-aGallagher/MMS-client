import { GlobalDebug } from '../../../debug/globalDebug';
import { addEditUserGroupConn } from './addEditUserGroupConn';

export const addEditUserGroupHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this User Group, please try again.`;
    try {
        const response = await addEditUserGroupConn({
            id: id ? id : 0,
            name: data.name,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditUserGroupHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
