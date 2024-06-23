import { GlobalDebug } from '../../../utility/debug/globalDebug';
import { addEditStatusTypeConn } from './addEditStatusTypeConn';

export const addEditStatusTypeHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Status Type, please try again.`;
    try {
        const response = await addEditStatusTypeConn({
            id: id ? id : 0,
            value: data.value,
            canComplete: data.canComplete,
            listPriority: data.listPriority,
            initialStatus: data.initialStatus,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditStatusTypeHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
