import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PayloadData {
    client: string;
    username: string;
    first: string;
    last: string;
    user_group_id: number;
    id: number;
    isAdmin: boolean;
}

const initialState = {
    value: { client: '', username: '', first: '', last: '', user_group_id: 0, id: 0, isAdmin: false },
};

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<PayloadData>) => {
            state.value.client = action.payload.client;
            state.value.username = action.payload.username;
            state.value.first = action.payload.first;
            state.value.last = action.payload.last;
            state.value.user_group_id = action.payload.user_group_id;
            state.value.id = action.payload.id;
            state.value.isAdmin = action.payload.isAdmin;
        },
    },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
