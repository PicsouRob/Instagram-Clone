import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function IsUserLoggedIn({ user, children, loggedInPath }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            return children;
        } else {
            navigate(loggedInPath);
        }
    }, [user, children, loggedInPath, navigate]);

    return children;
}

IsUserLoggedIn.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired,
    loggedInPath: PropTypes.string.isRequired
}

export default IsUserLoggedIn;