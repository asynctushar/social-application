import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        // logoutUser: (state, action) => {
        //     state.user = undefined;
        //     state.isAuthenticated = false;
        // },
        // setAllUsers: (state, action) => {
        //     state.allUsers = action.payload;
        // },
        // setUsersLoader: (state, action) => {
        //     state.isUsersLoading = action.payload;
        // }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;