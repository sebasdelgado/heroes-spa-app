import { useContext, useEffect } from "react"
import { AuthContext } from "../auth"
import { Navigate, useLocation } from "react-router-dom";


export const PrivateRoute = ({ children }) => {

    const { logged } = useContext( AuthContext );

    const { pathname, search } = useLocation();

    useEffect(() => {
        const lastPath = pathname + search;
        localStorage.setItem('lastpath', lastPath);
    }, [ pathname, search ]);
    
    return (logged)
    ? children
    : <Navigate to = "/login" />
}
