import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from './Spinner';

function VerifyLogin({ path = 'login' }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = setTimeout(() => {
            navigate(`/${path}`, {
                state: location.pathname
            });
        }, 2000); 

        return () => clearTimeout(checkLogin); 
    }, [navigate, location, path]);

    return (
            <Spinner />
    );
}

export default VerifyLogin;
