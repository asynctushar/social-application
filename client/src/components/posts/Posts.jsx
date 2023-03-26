import "./posts.scss";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../../redux/slices/appSlice";
import { setLoader, setPosts } from "../../redux/slices/postSlice";
import Post from "../post/Post";
import Loader from '../loader/Loader';
import axios from "axios";
import { useEffect } from "react";

const Posts = ({ userId }) => {
    const dispatch = useDispatch();
    const { isLoading, posts } = useSelector((state) => state.postState)

    useEffect(() => {
        const getPosts = async () => {
            try {
                dispatch(setLoader(true))
                const { data } = await axios.get(process.env.REACT_APP_API_URL + '/api/v1/posts', { withCredentials: true });

                if (userId) {
                    const posts = data.posts.filter(post => post.userId._id === userId);
                    dispatch(setPosts(posts));
                } else {
                    dispatch(setPosts(data.posts));
                }
                dispatch(setLoader(false));
            } catch (err) {
                dispatch(setError(err.response.data.message));
                dispatch(setLoader(false))
            }
        }

        getPosts();

    }, [userId]);

    return (
        <div className="posts">
            {isLoading ? <Loader /> : (
                [...posts].reverse().map((post) => (
                    <Post post={post} key={post._id} />
                ))
            )}
        </div>
    );
};

export default Posts;
