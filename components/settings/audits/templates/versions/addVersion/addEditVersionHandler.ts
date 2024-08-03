import { GlobalDebug } from '../../../../../utility/debug/globalDebug';
import { addEditVersionConn } from './addEditVersionConn';

export const addEditVersionHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Version, please try again.`;
    try {
        const response = await addEditVersionConn({
            id: id ? id : 0,
            title: data.title,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditVersionHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
