import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import moviesReducer from "./slices/moviesSlice";
import gptReducer from "./slices/gptSlice";

const appStore = configureStore({
    reducer: {
        login: loginReducer,
        movies: moviesReducer,
        gpt: gptReducer
    }
});

export default appStore;