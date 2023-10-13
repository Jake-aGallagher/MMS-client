import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Debug {
    debug: boolean;
}

const initialState = {
    value: { debug: false },
};

export const DebugSlice = createSlice({
    name: 'debug',
    initialState,
    reducers: {
        setDebug: (state, action: PayloadAction<Debug>) => {
            state.value.debug = action.payload.debug
        },
    },
});

export const { setDebug } = DebugSlice.actions;

export default DebugSlice.reducer;