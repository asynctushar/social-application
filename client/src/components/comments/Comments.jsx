import { useContext, useState } from "react";
import "./comments.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Comments = ({ postId }) => {
    const [desc, setDesc] = useState("");
    const { user } = useSelector(state => state.userState);

    const { isLoading, error, data } = useQuery(["comments"], () =>
        makeRequest.get(process.env.REACT_APP_API_URL + "/comments?postId=" + postId).then((res) => {
            return res.data;
        })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post(process.env.REACT_APP_API_URL +"/comments", newComment);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["comments"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ desc, postId });
        setDesc("");
    };

    return (
        <div className="comments">
            <div className="write">
                <Link to={"/profile/" + user.id} >
                    <img src={user.profilePic} alt={user.profilePic} />
                </Link>
                <input
                    type="text"
                    placeholder="write a comment"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button onClick={handleClick}>Send</button>
            </div>
            {error
                ? "Something went wrong"
                : isLoading
                    ? "loading"
                    : data.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <Link to={"/profile/" + comment.userid} >
                                <img src={comment.profilePic} alt={comment.profilePic} />
                            </Link>

                            <div className="info">
                                <Link to={"/profile/" + comment.userid} >
                                    <span>{comment.name}</span>
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
