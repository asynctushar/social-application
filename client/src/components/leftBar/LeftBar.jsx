import "./leftBar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { setError } from "../../redux/slices/appSlice";
import { setIsAuthenticated, setUser } from "../../redux/slices/userSlice";
import axios from 'axios';

const LeftBar = () => {
    const { user } = useSelector(state => state.userState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await axios.get(process.env.REACT_APP_API_URL + '/api/v1/logout', { withCredentials: true });

            dispatch(setUser(null));
            dispatch(setIsAuthenticated(false));
            navigate("/login");
        } catch (err) {
            dispatch(setError(err.response.data.message));
        }
    }

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <Link to={"/profile/" + user?._id} >
                            <img
                                src={user.profilePic?.url}
                                alt={user.profilePic?.url}
                            />
                        </Link>
                        <Link to={"/profile/" + user?._id} >
                            <span>{user?.name}</span>
                        </Link>
                    </div>
                    <div className="item">
                        <img src={Friends} alt="" />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <img src={Groups} alt="" />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <img src={Market} alt="" />
                        <span>Marketplace</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt="" />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <img src={Memories} alt="" />
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your shortcuts</span>
                    <div className="item">
                        <img src={Events} alt="" />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <img src={Gaming} alt="" />
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <img src={Gallery} alt="" />
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <img src={Videos} alt="" />
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <img src={Messages} alt="" />
                        <span>Messages</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <img src={Fund} alt="" />
                        <span>Fundraiser</span>
                    </div>
                    <div className="item">
                        <img src={Tutorials} alt="" />
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <img src={Courses} alt="" />
                        <span>Courses</span>
                    </div>
                    <div className="item">
                        <p className="logout" onClick={logoutHandler}>Log out</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
