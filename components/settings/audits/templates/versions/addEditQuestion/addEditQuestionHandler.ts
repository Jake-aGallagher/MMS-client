import { GlobalDebug } from '../../../../../utility/debug/globalDebug';
import { addEditQuestionConn } from './addEditQuestionConn';

export const addEditQuestionHandler = async (data: any, id: number, topicId: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Question, please try again.`;
    try {
        const response = await addEditQuestionConn({
            id: id ? id : 0,
            title: data.title,
            sortOrder: data.sortOrder,
            questionType: data.questionType,
            topicId,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditQuestionHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
