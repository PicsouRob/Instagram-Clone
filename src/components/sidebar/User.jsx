import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import { firebaseApp } from '../../lib/firebase';

// import { DEFAULT_IMAGE_PATH } from '../../constants/paths';

function User({ username, fullName, avatar }) {
    const navigate = useNavigate();
    const userLogOut = async () => {
        await firebaseApp.auth().signOut();
        navigate('/login');
        window.location.reload(true);
    }

    return (
        <div class="w-auto inline-block">
            {!username || !fullName ? (
                <Skeleton count={1} height={21} />
            ) : (
                <div class="flex items-center justify-between">
                    <Link to={`/p/${username}`} class="flex gap-x-2 mb-3 items-center w-full">
                        <img alt="" src={avatar ? avatar : `/images/avatars/default.png`}
                            class="rounded-full w-[3.5rem] h-[3.5rem] flex"
                        // onError={(e) => e.target.src = DEFAULT_IMAGE_PATH}
                        />
                        <div class="text-[#3a3a3a]">
                            <p class="text-sm font-bold">{username}</p>
                            <p class="text-sm">{fullName}</p>
                        </div>
                    </Link>
                    <button class="text-blue-medium text-sm w-20"
                        onClick={() => userLogOut()}
                    >
                        Log out
                    </button>
                </div>
            )}
        </div>
    )
}

User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string,
    avatar: PropTypes.string,
};

export default User;