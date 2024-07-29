import { GlobalDebug } from '../../../../../utility/debug/globalDebug';
import { addEditTopicConn } from './addEditTopicConn';

export const addEditTopicHandler = async (data: any, id: number, templateId: number, version: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Topic, please try again.`;
    try {
        const response = await addEditTopicConn({
            id: id ? id : 0,
            title: data.title,
            sortOrder: data.sortOrder,
            templateId,
            version,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditTopicHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
