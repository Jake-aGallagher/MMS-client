import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PayloadData {
    username: string;
    first: string;
    last: string;
    authority: number;
    id: number;
}

const initialState = {
    value: { username: '', first: '', last: '', authority: 0, id: 0 },
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<PayloadData>) => {
            state.value.username = action.payload.username;
            state.value.first = action.payload.first;
            state.value.last = action.payload.last;
            state.value.authority = action.payload.authority;
            state.value.id = action.payload.id;
        },
    },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;