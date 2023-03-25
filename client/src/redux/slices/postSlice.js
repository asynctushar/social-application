import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    posts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setLoader: (state, action) => {
            state.isLoading = action.payload;
        },
        setPost: (state, action) => {
            const posts = [...state.posts];
            posts.push(action.payload);

            state.posts = posts;
        },
        removePost: (state, action) => {
            state.posts = state.posts.filter(post => post._id !== action.payload);
        }
    }
});

export const { setPosts, setLoader, setPost, removePost } = postSlice.actions;

export default postSlice.reducer;