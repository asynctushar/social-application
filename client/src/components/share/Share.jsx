import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setError } from "../../redux/slices/appSlice";
import { setPost } from "../../redux/slices/postSlice";

const Share = () => {
    const [desc, setDesc] = useState("");
    const { user } = useSelector(state => state.userState);
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();

        if (desc.length < 1) return dispatch(setError("Please add post description"));

        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL + "/api/v1/post/new", { desc }, { headers: { "Content-Type": "application/json" }, withCredentials: true });

            dispatch(setPost(data.post));
        } catch (err) {
            dispatch(setError(err.response.data.message));
        }

    };

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <Link to={"/profile/" + user._id} >
                            <img src={user.profilePic} alt={user.profilePic} />
                        </Link>
                        <input
                            type="text"
                            placeholder={`What's on your mind ${user?.name}?`}
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>
                    <div className="right">
                        {/* {file && (
                            <img className="file" alt="" src={URL.createObjectURL(file)} />
                        )} */}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                        // onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
