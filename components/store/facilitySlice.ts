import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Facility {
    currentFacility: number;
}

const initialState = {
    value: { currentFacility: 0 },
};

export const CurrentFacilitySlice = createSlice({
    name: 'currentFacility',
    initialState,
    reducers: {
        setCurrentFacility: (state, action: PayloadAction<Facility>) => {
            state.value.currentFacility = action.payload.currentFacility
        },
    },
});

export const { setCurrentFacility } = CurrentFacilitySlice.actions;

export default CurrentFacilitySlice.reducer;
