import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../redux/slices/appSlice";
import { removePost } from "../../redux/slices/postSlice";
import axios from "axios";


const Post = ({ post }) => {
    const [likes, setLikes] = useState([]);
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { user } = useSelector(state => state.userState);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getLikes = async () => {
            try {
                const { data } = await axios.get(process.env.REACT_APP_API_URL + `/api/v1/post/${post._id}/like`, { withCredentials: true });

                setLikes(data.likes);
            } catch (err) {
                dispatch(setError(err.response.data.message))
            }
        }

        getLikes();

    }, []);

    const addLike = async () => {
        if (isLoading) return;

        try {
            setIsLoading(true);
            const { data } = await axios.post(process.env.REACT_APP_API_URL + `/api/v1/post/${post._id}/like`, {}, { withCredentials: true });

            setLikes(data.likes);
            setIsLoading(false)
        } catch (err) {
            dispatch(setError(err.response.data.message));
            setIsLoading(false)
        }
    };

    const removeLike = async () => {
        if (isLoading) return;

        try {
            setIsLoading(true);
            const { data } = await axios.delete(process.env.REACT_APP_API_URL + `/api/v1/post/${post._id}/like`, { withCredentials: true });

            setLikes(data.likes);
            setIsLoading(false);
        } catch (err) {
            dispatch(setError(err.response.data.message));
            setIsLoading(false);
        }
    };

    const deletePost = async () => {
        try {
            setIsLoading(true);
            await axios.delete(process.env.REACT_APP_API_URL + `/api/v1/post/${post._id}`, { withCredentials: true });

            dispatch(removePost(post._id));
            setIsLoading(false);
        } catch (err) {
            dispatch(setError(err.response.data.message));
            setIsLoading(false);
        }
    };


    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <Link
                            to={`/profile/${post?.userId._id}`}
                        >
                            <img src={post.userId.profilePic?.url} alt={post.userId.profilePic?.url} />
                        </Link>
                        <div className="details">
                            <Link
                                to={`/profile/${post?.userId._id}`}
                            >
                                <span className="name">{post?.userId.name}</span>
                            </Link>
                            <span className="date">{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
                    {menuOpen && post.userId._id === user._id && (
                        <button disabled={isLoading} onClick={deletePost}>delete</button>
                    )}
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.images?.url} alt={post.images?.url} />
                </div>
                <div className="info">
                    <div className="item">
                        {likes?.some((like) => like.userId === user?._id) ? (
                            <FavoriteOutlinedIcon
                                style={{ color: "red" }}
                                onClick={removeLike}
                            />
                        ) : (
                            <FavoriteBorderOutlinedIcon onClick={addLike} />
                        )}
                        {likes?.length} Likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        See Comments
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments postId={post._id} />}
            </div>
        </div>
    );
};

export default Post;
