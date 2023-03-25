import "./update.scss";
import { useEffect, useState } from "react";
import axios from 'axios';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/slices/userSlice';
import { setError } from "../../redux/slices/appSlice";

const Update = ({ setOpenUpdate, user }) => {
    const [cover, setCover] = useState("");
    const [profile, setProfile] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [website, setWebsite] = useState("");
    const [city, setCity] = useState("");
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setWebsite(user.website ? user.website : "");
        setCity(user.city ? user.city : "");
    }, [user])

    const handleUpdate = async (e) => {
        e.preventDefault();
        let tempPassword = undefined;

        if (password.length > 0) {
            if (password.length < 8) return dispatch(setError("Password must be minimum of 8 characters"));

            tempPassword = password;
        }

        try {
            setIsLoading(true);
            const { data } = await axios.put(process.env.REACT_APP_API_URL + "/api/v1/me", { name, email, password: tempPassword, website, city }, { headers: { "Content-Type": "application/json" }, withCredentials: true });

            dispatch(setUser(data.user));
            setIsLoading(false);
            setOpenUpdate(false)
        } catch (err) {
            console.log(err)
            dispatch(setError(err.response.data.message));
            setIsLoading(false)
        }
    }
    return (
        <div className="update">
            <div className="wrapper">
                <h1>Update Your Profile</h1>
                <form onSubmit={handleUpdate}>
                    <div className="files">
                        <label htmlFor="cover">
                            <span>Cover Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={
                                        cover
                                            ? URL.createObjectURL(cover)
                                            : user.coverPic
                                    }
                                    alt=""
                                />
                                <CloudUploadIcon className="icon" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="cover"
                            style={{ display: "none" }}
                            onChange={(e) => setCover(e.target.files[0])}
                        />
                        <label htmlFor="profile">
                            <span>Profile Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={
                                        profile
                                            ? URL.createObjectURL(profile)
                                            : user.profilePic
                                    }
                                    alt=""
                                />
                                <CloudUploadIcon className="icon" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profile"
                            style={{ display: "none" }}
                            onChange={(e) => setProfile(e.target.files[0])}
                        />
                    </div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>Country / City</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <label>Website</label>
                    <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <button disabled={isLoading}>Update</button>
                </form>
                <button className="close" onClick={() => setOpenUpdate(false)}>
                    close
                </button>
            </div>
        </div>
    );
};

export default Update;
