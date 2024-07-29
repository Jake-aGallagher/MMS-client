import { GlobalDebug } from '../../../../../utility/debug/globalDebug';
import { addEditOptionConn } from './addEditOptionConn';

export const addEditOptionHandler = async (data: any, id: number, questionId: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Option, please try again.`;
    try {
        const response = await addEditOptionConn({
            id: id ? id : 0,
            title: data.title,
            sortOrder: data.sortOrder,
            questionId,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditOptionHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
