import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useParams } from "react-router-dom";
import Update from "../../components/update/Update";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setError } from "../../redux/slices/appSlice";
import LeftBar from "../../components/leftBar/LeftBar";
import Navbar from "../../components/navbar/Navbar";
import RightBar from "../../components/rightBar/RightBar";
import Loader from "../../components/loader/Loader";
import Share from '../../components/share/Share';

const Profile = () => {
    const [openUpdate, setOpenUpdate] = useState(false);
    const [user, setUser] = useState(null);
    const [isFollowed, setIsFollowed] = useState(null);
    const { user: ownUser } = useSelector(state => state.userState);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const dispatch = useDispatch();


    useEffect(() => {
        if (id === ownUser._id) {
            setUser(ownUser);
            setIsLoading(false);
        } else {
            const getUser = async () => {
                try {
                    const { data } = await axios.get(process.env.REACT_APP_API_URL + `/api/v1/user/${id}`, { withCredentials: true });

                    setUser(data.user);
                    setIsLoading(false);
                } catch (err) {
                    dispatch(setError(err.response.data.message));
                    setIsLoading(false);
                }
            }

            getUser();
        }
    }, [id, dispatch, ownUser]);

    useEffect(() => {
        if (user && user._id !== ownUser._id) {
            const getRelationship = async () => {
                try {
                    const { data } = await axios.get(process.env.REACT_APP_API_URL + `/api/v1/relationship/${id}`, { withCredentials: true });

                    setIsFollowed(data.isFollowed);
                } catch (err) {
                    dispatch(setError(err.response.data.message));
                }
            }

            getRelationship();
        }

    }, [user, ownUser, dispatch])

    const handleFollow = async () => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL + `/api/v1/relationship/${id}`, {}, { withCredentials: true });

            setIsFollowed(data.isFollowed);
        } catch (err) {
            console.log(err)
            dispatch(setError(err.response.data.message));
        }
    };

    const handleUnFollow = async () => {
        try {
            const { data } = await axios.delete(process.env.REACT_APP_API_URL + `/api/v1/relationship/${id}`, { withCredentials: true });

            setIsFollowed(data.isFollowed);
        } catch (err) {
            dispatch(setError(err.response.data.message));
        }
    };


    return (
        <>
            <Navbar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 6 }}>
                    {isLoading ? <Loader /> : (
                        <div className="profile">
                            <div className="images">
                                <img src={user?.coverPic?.url} alt="" className="cover" />
                                <img src={user?.profilePic?.url} alt="" className="profilePic" />
                            </div>
                            <div className="profileContainer">
                                <div className="uInfo">
                                    <div className="left">
                                        <a href="http://facebook.com">
                                            <FacebookTwoToneIcon fontSize="large" />
                                        </a>
                                        <a href="http://facebook.com">
                                            <InstagramIcon fontSize="large" />
                                        </a>
                                        <a href="http://facebook.com">
                                            <TwitterIcon fontSize="large" />
                                        </a>
                                    </div>
                                    <div className="center">
                                        <span>{user?.name}</span>
                                        <div className="info">
                                            <div className="item">
                                                <PlaceIcon />
                                                <p>{user?.city}</p>
                                            </div>
                                            <div className="item">
                                                <LanguageIcon />
                                                <p>{user?.website}</p>
                                            </div>
                                        </div>
                                        {ownUser?._id === user?._id ? (
                                            <button onClick={() => setOpenUpdate(true)}>update</button>
                                        ) : (isFollowed ? (
                                            <button onClick={handleUnFollow}>
                                                Unfollow
                                            </button>
                                        ) : (
                                            <button onClick={handleFollow}>
                                                Follow
                                            </button>
                                        )
                                        )}
                                    </div>
                                    <div className="right">
                                        <EmailOutlinedIcon />
                                        <MoreVertIcon />
                                    </div>
                                </div>
                                {ownUser?._id === user?._id && (
                                    <Share />
                                )}
                                <Posts userId={user?._id} />
                            </div>
                            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={ownUser} />}
                        </div>
                    )}
                </div >
                <RightBar />
            </div>
        </>
    );
};

export default Profile;
