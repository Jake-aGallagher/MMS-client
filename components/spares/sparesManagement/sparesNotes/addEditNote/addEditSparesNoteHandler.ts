import { GlobalDebug } from '../../../../debug/globalDebug';
import { addEditSparesNoteConn } from './addEditSparesNoteConn';

export const addEditSparesNoteHandler = async (data: any, id: number, currentProperty: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this Note, please try again.`;
    try {
        const response = await addEditSparesNoteConn({
            propertyId: currentProperty,
            title: data.title,
            note: data.note,
            noteId: id,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditSparesNoteHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
            ['currentProperty', currentProperty],
        ]);
        alert(alertString);
    }
};
