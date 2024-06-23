import axios from 'axios';
import { SERVER_URL } from '../../../utility/routing/addressAPI';
import { GlobalDebug } from '../../../utility/debug/globalDebug';

export const addEditPermissionsHandler = async (data: any, id: number, closeModal: () => void) => {
    const alertString = `There has been an issue Assigning Permissions to this User, please try again.`;
    let assignedPermissions: string[] = [];
    const dataKeys = Object.keys(data);
    if (dataKeys.length > 0) {
        assignedPermissions = dataKeys.filter((k) => data[k]);
    }
    try {
        const response = await axios.put(
            `${SERVER_URL}/permissions/group/${id}`,
            {
                userGroupId: id,
                assignedPermissions: assignedPermissions,
            },
            {
                headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') },
            }
        );
        if (response.data.created) {
            closeModal();
        } else {
            alert(alertString);
        }
    } catch (err) {
        GlobalDebug('addEditPermissionsHandler', [
            ['error', err],
            ['data', data],
            ['id', id],
        ]);
        alert(alertString);
    }
};
