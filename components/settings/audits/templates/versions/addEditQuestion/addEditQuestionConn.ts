import axios from 'axios';
import { SERVER_URL } from '../../../../../utility/routing/addressAPI';

export const addEditQuestionConn = async (data: {}) => {
    return await axios.put(`${SERVER_URL}/audit/question`, data, { headers: { Authorisation: 'Bearer ' + localStorage.getItem('token') } });
};
