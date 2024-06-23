import { GlobalDebug } from '../../../../utility/debug/globalDebug';
import { addEditEnumValueConn } from './addEditEnumValueConn';

export const addEditEnumValueHandler = async (data: any, id: number, groupId: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Enum Value, please try again.`;
    try {
        const response = await addEditEnumValueConn({
            id: id ? id : 0,
            enumGroupId: groupId,
            value: data.name,
            listPriority: data.order,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditEnumValueHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
            ['groupId', groupId],
        ]);
        alert(alertString);
    }
};
