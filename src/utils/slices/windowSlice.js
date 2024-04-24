import { createSlice } from "@reduxjs/toolkit";

const windowSlice = createSlice({
    name: 'windowSlice',
    initialState: {
        opaqueHeader: false
    },
    reducers: {
        toggleOpaqueHeader: (store, action) => {
            store.opaqueHeader = action.payload;
        }
    }
});

export const { toggleOpaqueHeader } = windowSlice.actions;

export default windowSlice.reducer;