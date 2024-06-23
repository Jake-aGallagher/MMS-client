import { GlobalDebug } from '../../../utility/debug/globalDebug';
import { addEditTaskTypeConn } from './addEditTaskTypeConn';

export const addEditTaskTypeHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Task Type, please try again.`;
    try {
        const response = await addEditTaskTypeConn({
            id: id ? id : 0,
            value: data.value,
            listPriority: data.listPriority,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditTaskTypeHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
