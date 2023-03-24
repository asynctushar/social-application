import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "../../redux/slices/userSlice";
import axios from "axios";
import "./login.scss";

const Login = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [err, setErr] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userState);

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, dispatch])

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL + '/api/auth/login', inputs, { headers: { "Content-Type": "application/json" } });

            dispatch(setUser(data));
        } catch (err) {
            console.log(err)
            setErr(err.response.data);
        }
    };

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Zahface.</h1>
                    <p>
                        Connect with families,friends and the world around you on Zahface.
                    </p>
                    <span>Don't have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />
                        {err && err}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
