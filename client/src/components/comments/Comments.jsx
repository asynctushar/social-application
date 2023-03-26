import "./comments.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { setError } from "../../redux/slices/appSlice";
import axios from "axios";

const Comments = ({ postId }) => {
    const [desc, setDesc] = useState("");
    const { user } = useSelector(state => state.userState);
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        const getComments = async () => {
            try {
                const { data } = await axios.get(process.env.REACT_APP_API_URL + `/api/v1/post/${postId}/comment`, { withCredentials: true });

                setComments(data.comments)
            } catch (err) {
                dispatch(setError(err.response.data.message));
            }
        }

        getComments();

    }, []);


    const addComment = async (e) => {
        e.preventDefault();
        if (desc.length < 1) return dispatch(setError("Please add description"));

        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL + `/api/v1/post/${postId}/comment`, {desc}, { withCredentials: true });

            setComments(data.comments);
            setDesc("")
        } catch (err) {
            dispatch(setError(err.response.data.message))
        }
    };

    return (
        <div className="comments">
            <div className="write">
                <Link to={"/profile/" + user._id} >
                    <img src={user.profilePic?.url} alt={user.profilePic?.url} />
                </Link>
                <input
                    type="text"
                    placeholder="write a comment"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={addComment}>Comment</button>
            </div>
            {comments?.map((comment) => (
                <div className="comment" key={comment._id}>
                    <Link to={"/profile/" + comment.userId._id} >
                        <img src={comment.userId.profilePic?.url} alt={comment.userId.profilePic?.url} />
                    </Link>

                    <div className="info">
                        <Link to={"/profile/" + comment.userId._id} >
                            <span>{comment.userId.name}</span>
                        </Link>
                        <p>{comment.desc}</p>
                    </div>
                    <span className="date">
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Comments;
