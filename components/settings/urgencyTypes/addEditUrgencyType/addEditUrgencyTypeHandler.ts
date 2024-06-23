import { GlobalDebug } from '../../../utility/debug/globalDebug';
import { addEditUrgencyTypeConn } from './addEditUrgencyTypeConn';

export const addEditUrgencyTypeHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Urgency Type, please try again.`;
    try {
        const response = await addEditUrgencyTypeConn({
            id: id ? id : 0,
            value: data.value,
            urgencyNumber: data.urgencyNumber,
            urgencyPeriod: data.urgencyPeriod,
            listPriority: data.listPriority,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditUrgencyTypeHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
