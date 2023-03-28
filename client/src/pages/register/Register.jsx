import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { setError } from '../../redux/slices/appSlice';
import { setUser, setLoader, setIsAuthenticated } from '../../redux/slices/userSlice';
import "./register.scss";
import axios from "axios";
import Loader from '../../components/loader/Loader';

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.userState);


    const handleClick = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return dispatch(setError("Password doesn't match"))
        }

        if (password.length < 8) {
            return dispatch(setError("Password must be atleast 8 character"))
        }

        try {
            dispatch(setLoader(true))
            const { data } = await axios.post(process.env.REACT_APP_API_URL + "/api/v1/register", { name, email, password }, { headers: { "Content-Type": "application/json" }, withCredentials: true });

            dispatch(setUser(data.user));
            dispatch(setIsAuthenticated(true));
            dispatch(setLoader(false));
            navigate("/");
        } catch (err) {
            dispatch(setError(err.response.data.message));
            dispatch(setLoader(false))
        }
    };

    return (
        <>
            {isLoading ? <Loader /> : (
                <div className="register">
                    <div className="card">
                        <div className="left">
                            <h1>Zahface.</h1>
                            <p>
                                Connect with families, friends and the world around you on Zahface.
                            </p>
                            <span>Do you have an account?</span>
                            <Link to="/login">
                                <button>Login</button>
                            </Link>
                        </div>
                        <div className="right">
                            <h1>Register</h1>
                            <form onSubmit={handleClick}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button disabled={email.length < 1 || password.length < 1 || name.length < 1 || confirmPassword.length < 1} >Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Register;
