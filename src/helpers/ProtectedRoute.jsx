import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ user, children, ...rest }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return children;
}

ProtectedRoute.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired
}

export default ProtectedRoute;