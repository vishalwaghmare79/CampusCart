import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from './Spinner';

function LoginFirst() {
    const [count, setCount] = useState(3);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Function to handle the countdown and redirect
        const interval = setInterval(() => {
            setCount((prev) => --prev);
        }, 1000);

        if (count === 0) {
            navigate('/login', {
                state: location.pathname
            });
        }

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [count, navigate, location]);

    let heading = `Please log in first. Redirecting you in ${count} seconds...`

    return (
        <div className="loginfirst-container">
            <Spinner heading={heading}/>
        </div>
    );
}

export default LoginFirst;
