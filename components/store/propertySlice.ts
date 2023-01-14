import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Property {
    currentProperty: number;
}

const initialState = {
    value: { currentProperty: 0 },
};

export const CurrentPropertySlice = createSlice({
    name: 'currentProperty',
    initialState,
    reducers: {
        setCurrentProperty: (state, action: PayloadAction<Property>) => {
            state.value.currentProperty = action.payload.currentProperty
        },
    },
});

export const { setCurrentProperty } = CurrentPropertySlice.actions;

export default CurrentPropertySlice.reducer;
