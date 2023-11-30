import { configureStore } from '@reduxjs/toolkit';
import CurrentPropertySlice from './propertySlice';
import UserSlice from './userSlice';
import DebugSlice from './debugSlice';
import PermissionsSlice from './permissionsSlice';

export const store = configureStore({
    reducer: {
        user: UserSlice,
        currentProperty: CurrentPropertySlice,
        permissions: PermissionsSlice,
        debug: DebugSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
