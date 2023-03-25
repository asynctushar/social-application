import "./style.scss";
import Login from "./pages/login/Login";
import ProtectedRoute from './utils/ProtectedRoute';
import Register from "./pages/register/Register";
import Profile from './pages/profile/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIsAuthenticated, setLoader, setUser } from "./redux/slices/userSlice";
import axios from "axios";
import { HelmetProvider } from 'react-helmet-async';
import { setError } from "./redux/slices/appSlice";

function App() {
    const { darkMode, error } = useSelector((state) => state.appState);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await axios.get(process.env.REACT_APP_API_URL + '/api/v1/me', { withCredentials: true });

                dispatch(setUser(data.user));
                dispatch(setIsAuthenticated(true))
                dispatch(setLoader(false));
            } catch (err) {
                dispatch(setError(err.response.data.message));
                dispatch(setLoader(false))
            }
        }

        getUser();

    }, []);

    return (
        <HelmetProvider>
            <Router>
                <div className={`theme-${darkMode ? "dark" : "light"}`}>
                    <Routes>
                        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
                        <Route path="/profile/:id" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div >
            </Router>
        </HelmetProvider >
    );
}

export default App;
