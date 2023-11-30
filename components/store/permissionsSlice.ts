import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PayloadData {
    permissions: { [key: string]: { [key: string]: boolean } };
}

const initialState = {
    value: { permissions: <{ [key: string]: { [key: string]: boolean } }>{} },
};

export const PermissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
        setPermissions: (state, action: PayloadAction<PayloadData>) => {
            state.value.permissions = action.payload.permissions;
        },
    },
});

export const { setPermissions } = PermissionsSlice.actions;

export default PermissionsSlice.reducer;
