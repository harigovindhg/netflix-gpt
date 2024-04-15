import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: 'login',
    initialState: null,
    reducers: {
        loginUser: (state, action) => {
            return action.payload
        },
        logoutUser: (state, action) => {
            return null
        }
    }
});

export const { loginUser, logoutUser } = loginSlice.actions;

export default loginSlice.reducer;