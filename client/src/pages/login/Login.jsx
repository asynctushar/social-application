import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setLoader, setUser } from "../../redux/slices/userSlice";
import { setError } from '../../redux/slices/appSlice';
import axios from "axios";
import "./login.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.userState);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, dispatch])

    const handleLogin = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            return dispatch(setError("Password must be atleast 8 character"))
        }

        try {
            dispatch(setLoader(true))
            const {data} = await axios.post(process.env.REACT_APP_API_URL + '/api/v1/login', { email, password }, { headers: { "Content-Type": "application/json" } , withCredentials: true });

            dispatch(setUser(data.user));
            dispatch(setIsAuthenticated(true));
            dispatch(setLoader(false));
            
        } catch (err) {
            console.log(err)
            dispatch(setError(err.response.data.message));
            dispatch(setLoader(false));
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
                    <form  onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button disabled={email.length < 1 || password.length < 1 }>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
