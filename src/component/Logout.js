import React, { useEffect } from 'react';

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('jwtUnicode');
        // const token = localStorage.getItem('jwtToken');
        // const unicode = localStorage.getItem('jwtUnicode');
        window.location.href = '/login';
    }, []);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default Logout;
