import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import moviesReducer from "./slices/moviesSlice";
import gptReducer from "./slices/gptSlice";
import windowReducer from "./slices/windowSlice";

const appStore = configureStore({
    reducer: {
        login: loginReducer,
        movies: moviesReducer,
        gpt: gptReducer,
        windows: windowReducer
    }
});

export default appStore;