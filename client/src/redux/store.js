import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';
import postSlice from './slices/postSlice';

const reducer = {
    appState: appReducer,
    userState: userReducer,
    postState: postSlice
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;