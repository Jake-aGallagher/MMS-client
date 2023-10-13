import { configureStore } from '@reduxjs/toolkit';
import CurrentPropertySlice from './propertySlice';
import UserSlice from './userSlice';
import DebugSlice from './debugSlice';

export const store = configureStore({
    reducer: {
        user: UserSlice,
        currentProperty: CurrentPropertySlice,
        debug: DebugSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
