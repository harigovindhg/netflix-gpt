import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import moviesSlice from "./slices/moviesSlice";

const appStore = configureStore({
    reducer: {
        login: loginSlice,
        movies: moviesSlice
    }
});

export default appStore;