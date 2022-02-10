import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

// import { DEFAULT_IMAGE_PATH } from '../../constants/paths';

function User({ username, fullName }) {
    return (
        <div class="w-full">
            {!username || !fullName ? (
                <Skeleton count={1} height={21} />
            ) : (
                <Link to={`/p/${username}`} class="flex gap-4 mb-6 items-center w-full pr-6">
                    <div class="flex items-center justify-between">
                        <img alt="" src="/images/avatars/karl.jpg"
                            class="rounded-full w-16 h-16 flex"
                        // onError={(e) => e.target.src = DEFAULT_IMAGE_PATH}
                        />
                    </div>
                    <div class="">
                        <p class="text-sm font-bold">{username}</p>
                        <p class="text-sm">{fullName}</p>
                    </div>
                </Link>
            )}
        </div>
    )
}

User.propTypes = {
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string
};

export default User;