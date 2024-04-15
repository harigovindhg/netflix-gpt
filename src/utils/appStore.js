import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";

const appStore = configureStore({
    reducer: {
        login: loginSlice
    }
});

export default appStore;