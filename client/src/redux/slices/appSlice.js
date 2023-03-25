import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: undefined,
    success: undefined,
    darkMode: JSON.parse(localStorage.getItem("darkMode")) || false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state, action) => {
            state.error = undefined;
        },
        toggleDarkMode: (state, action) => {
            const darkMode = state.darkMode;
            state.darkMode = !darkMode;
            localStorage.setItem("darkMode", !darkMode);
        }
        // setSuccess: (state, action) => {
        //     state.success = action.payload;
        // },
        // clearSuccess: (state, action) => {
        //     state.success = undefined;
        // }
    }
});

export const { setError, clearError, toggleDarkMode} = appSlice.actions;

export default appSlice.reducer;