import "./style.scss";
import Login from "./pages/login/Login";
import ProtectedRoute from './utils/ProtectedRoute';
import Register from "./pages/register/Register";
import Profile from './pages/profile/Profile';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useEffect, useState } from "react";
import { setIsAuthenticated, setLoader, setUser } from "./redux/slices/userSlice";
import axios from "axios";
import { HelmetProvider } from 'react-helmet-async';
import { clearError, clearSuccess, setError } from "./redux/slices/appSlice";
import { Alert, Snackbar } from '@mui/material';

function App() {
    const { darkMode, error, success } = useSelector((state) => state.appState);
    const dispatch = useDispatch();
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const CustomAlert = forwardRef((props, ref) => <Alert elevation={6} variant="filled" {...props} ref={ref} />);


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

    useEffect(() => {
        if (error) {
            setIsErrorOpen(true);

        } else if (success) {
            setIsSuccessOpen(true);
        }

    }, [error, success]);

    const handleErrorClose = () => {
        setIsErrorOpen(false);
        dispatch(clearError());
    }

    const handleSuccessClose = () => {
        setIsSuccessOpen(false);
        dispatch(clearSuccess());
    }

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
                    <Snackbar open={isErrorOpen} autoHideDuration={3000} onClose={handleErrorClose}>
                        <CustomAlert onClose={handleErrorClose} severity="error" className="custom-alert">{error}</CustomAlert>
                    </Snackbar>
                    <Snackbar open={isSuccessOpen} autoHideDuration={3000} onClose={handleSuccessClose}>
                        <CustomAlert onClose={handleSuccessClose} severity="success" className="custom-alert">{success}</CustomAlert>
                    </Snackbar>
                </div >
            </Router>
        </HelmetProvider >
    );
}

export default App;
