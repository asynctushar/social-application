import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setError } from "../../redux/slices/appSlice";
import { setPost } from "../../redux/slices/postSlice";

const Share = () => {
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useSelector(state => state.userState);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const fileRef = useRef();
    
    const handleClick = async (e) => {
        e.preventDefault();
        if (desc.length < 1) return dispatch(setError("Please add post description"));

        const formData = new FormData();
        formData.append('desc', desc);

        if (file) {
            formData.append('post', file);
        }


        try {
            setIsLoading(true)
            const { data } = await axios.post(process.env.REACT_APP_API_URL + "/api/v1/post/new", formData, { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true });
            setDesc("");
            fileRef.current.value = '';
            setFile(null);
            dispatch(setPost(data.post));
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false);
            dispatch(setError(err.response.data.message));
        }

    };

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <Link to={"/profile/" + user._id} >
                            <img src={user.profilePic?.url} alt={user.profilePic?.url} />
                        </Link>
                        <input
                            type="text"
                            placeholder={`What's on your mind ${user?.name}?`}
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                            ref={fileRef}
                        />
                    </div>
                    <div className="right">
                        {file && (
                            <img className="file" alt="" src={URL.createObjectURL(file)} />
                        )}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            disabled={isLoading}
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}

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
                        <button onClick={handleClick} disabled={isLoading}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
