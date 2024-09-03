import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import LoginFirst from "../components/spinner/LoginFirst";

export const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    useEffect(() => {
        // Function to check user authentication
        const authCheck = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`, {
                    headers: {
                        "Authorization": `${auth?.token}`
                    }
                });                
                setOk(res.data.ok);
            } catch (error) {
                console.error("Authentication check failed", error);
                setOk(false);
            }
        };

        // Check authentication if token is available
        if (auth?.token) {
            authCheck();
        } else {
            setOk(false);
        }
    }, [auth?.token]);

    // Render the Outlet if authenticated, otherwise render LoginFirst
    return ok ? <Outlet /> : <LoginFirst />;
};
