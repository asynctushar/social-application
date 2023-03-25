import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/loader/Loader";


const ProtectedRoute = ({ children }) => {
    const { isLoading, isAuthenticated } = useSelector((state) => state.userState);

    return (
        <Fragment>
            {!isLoading && !isAuthenticated && <Navigate to="/login" />}
            { !isLoading && isAuthenticated && children}
            {isLoading && <Loader />}
        </Fragment>
    )
}
export default ProtectedRoute;