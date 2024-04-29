import axios from 'axios';
import { SERVER_URL } from '../../routing/addressAPI';
import { GlobalDebug } from '../../debug/globalDebug';

export const assignUsersdHandler = async (data: any, facilityNumber: number, closeModal: () => void) => {
    const alertString = `There has been an issue Assigning Users to this Facility, please try again.`;
    let assignedUsers: string[] = [];
    const dataKeys = Object.keys(data);
    if (dataKeys.length > 0) {
        assignedUsers = dataKeys.filter((k) => data[k]);
    }
    try {
        const response = await axios.put(
            `${SERVER_URL}/facilities/assign-users`,
            {
                facilityNo: facilityNumber,
                assignedUsers: assignedUsers,
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
        GlobalDebug('assignUsersdHandler', [
            ['error', err],
            ['data', data],
            ['facilityNumber', facilityNumber],
        ]);
        alert(alertString);
    }
};
