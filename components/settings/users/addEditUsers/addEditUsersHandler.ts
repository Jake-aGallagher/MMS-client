import { GlobalDebug } from '../../../debug/globalDebug';
import { addEditUsersConn } from './addEditUsersConn';

export const addEditUsersHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue ${id > 0 ? 'editing' : 'creating'} this User, please try again.`;
    try {
        const response = await addEditUsersConn({
            id,
            username: data.username,
            first: data.first,
            last: data.last,
            password: data.password,
            user_group_id: data.user_group_id,
        });
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditUsersHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
