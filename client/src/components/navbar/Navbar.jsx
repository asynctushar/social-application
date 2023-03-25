import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/slices/appSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const { darkMode } = useSelector(state => state.appState);
    const { user } = useSelector(state => state.userState);

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
                <GridViewOutlinedIcon />
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
                            src={user?.profilePic}
                            alt={user.profilePic}
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
