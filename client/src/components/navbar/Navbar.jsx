import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode, setError } from "../../redux/slices/appSlice";
import axios from "axios";
import { setIsAuthenticated, setUser } from "../../redux/slices/userSlice";

const Navbar = () => {
    const { darkMode } = useSelector(state => state.appState);
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
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Zahface</span>
                </Link>
                <Link to="/" >
                    <HomeOutlinedIcon />
                </Link>
                {darkMode ? (
                    <WbSunnyOutlinedIcon onClick={() => dispatch(toggleDarkMode())} />
                ) : (
                    <DarkModeOutlinedIcon onClick={() => dispatch(toggleDarkMode())} />
                )}
                <LogoutIcon className="logout-icon" onClick={logoutHandler}/>
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>
            <div className="right">
                <PersonOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />
                <div className="user">
                    <Link to={"/profile/" + user?._id} >
                        <img
                            src={user?.profilePic?.url}
                            alt={user.profilePic?.url}
                        />
                    </Link>
                    <Link to={"/profile/" + user?._id} >
                        <span>{user.name}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
