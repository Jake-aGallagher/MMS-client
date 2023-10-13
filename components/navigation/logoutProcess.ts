import { setUser } from '../store/userSlice';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { setDebug } from '../store/debugSlice';

export const logoutProcess = (logoutHandler: () => void, dispatch: Dispatch<AnyAction>) => {
    dispatch(
        setUser({
            username: '',
            first: '',
            last: '',
            user_group_id: 0,
            id: 0,
        })
    );
    dispatch(setDebug({ debug: false }));
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    logoutHandler();
};
